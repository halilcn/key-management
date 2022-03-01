import { RequestHandler } from "express";
import { createClient } from "redis";

import handle from "../../utils/handle";
import ProductLog from "../../models/product-log";
import Key from "../../models/key";
import KeyPermission from "../../models/key-permission";
import { ProductError } from "../../utils/error/errors";
import response from "../../utils/response";
import logger from "../../utils/logger";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const client = createClient();
        await client.on('error', (err) => logger.warn(`Redis Client Error: ${err}`));
        await client.connect();

        const { params, headers, query, user } = req;
        const productLogFilter: any = {
            key: headers.key,
            product: params.product
        };

        const redisKey = `product-logs_${headers.key}_${params.product}_${query.startDate && query.endDate ? `${query.startDate.toString()}-${query.endDate.toString()}` : 'no_filter'}`;
        const dataOfCache = await client.get(redisKey);
        if (dataOfCache) return next(response.success({ productLogs: JSON.parse(dataOfCache) }));

        const key = await Key.findOne({ key: headers.key, user: user._id });
        const userHasProduct = await KeyPermission.exists({ key: key._id, product: params.product });

        if (!userHasProduct) throw new ProductError();

        if (query.startDate && query.endDate) {
            productLogFilter.createdAt = { $gte: query.startDate, $lte: query.endDate };
        }

        const productLogs = await ProductLog
            .find(productLogFilter)
            .select('method createdAt')
            .lean();

        productLogs.map(log => delete log._id);

        await client.setEx(redisKey, 60 * 5, JSON.stringify(productLogs));

        next(response.success({ productLogs }));
    }, next);
};

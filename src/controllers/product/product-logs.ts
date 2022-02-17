import { RequestHandler } from "express";

import handle from "../../utils/handle";
import ProductLog from "../../models/product-log";
import Key from "../../models/key";
import KeyPermission from "../../models/key-permission";
import { ProductError } from "../../utils/error/errors";
import response from "../../utils/response";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { params, headers, query, user } = req;
        const productLogFilter: any = {
            key: headers.key,
            product: params.product
        };

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

        next(response.success({ productLogs }));
    }, next);
};

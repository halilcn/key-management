import { RequestHandler } from "express";

import handle from "../../utils/handle";
import ProductLog from "../../models/product-log";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { params, headers, query } = req;

        //todo: tarih tipi!
        //todo: olmayan ürün gelirse !

        const productLogFilter: any = {
            key: headers.key,
            product: params.product,
        };

        if (query.startDate && query.endDate) {
            productLogFilter.createdAt = { $gte: query.startDate, $lte: query.endDate };
        }

        const productLogs = await ProductLog.find(productLogFilter);


        res.json(productLogs);
    }, next);
};

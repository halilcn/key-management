import { Request } from "express";

import ProductLog from "../models/product-log";
import { TokenLogError } from "../utils/error/errors";

export default async (req: Request): Promise<void> => {
    try {
        const { method, ip, url, headers } = req;

        await ProductLog.create({
            key: headers.key,
            product: url.split('/')[1],
            method: method.toLowerCase(),
            ip,
        });
    } catch (err) {
        throw new TokenLogError();
    }
};

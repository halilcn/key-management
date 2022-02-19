import { RequestHandler } from "express";

import handle from "../../utils/handle";
import storeLog from "../../jobs/store-log";
import response from "../../utils/response";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        await storeLog(req);
        next(response.success());
    }, next);
};

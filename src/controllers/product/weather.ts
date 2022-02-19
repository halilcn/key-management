import { RequestHandler } from "express";

import handle from "../../utils/handle";
import storeLog from "../../jobs/store-log";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        await storeLog(req);
        res.send('ok');
    }, next);
};

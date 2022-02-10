import { RequestHandler } from "express";
import handle from "../../utils/handle";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        res.send('ok');
    }, next);
};

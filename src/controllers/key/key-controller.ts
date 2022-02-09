import { RequestHandler } from "express";

import handle from "../../utils/handle";
import response from "../../utils/response";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { userId } = req.params;
        console.log(userId);
        next(response.success());
    }, next);
};

export const store: RequestHandler = (req, res, next) => {
    handle(async () => {
        next(response.created());
    }, next);
};

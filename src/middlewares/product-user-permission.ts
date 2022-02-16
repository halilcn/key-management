import { RequestHandler } from "express";

import handle from "../utils/handle";
import Key from "../models/key";
import { TokenError } from "../utils/error/errors";

const productUserPermission: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { headers, user } = req;

        const userHasKey = await Key.exists({
            key: headers.key,
            user: user._id
        });

        if (!userHasKey) throw new TokenError();

        next();
    }, next);
};

export default productUserPermission;

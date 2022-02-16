import { RequestHandler } from "express";
import dayjs from "dayjs";

import Key from "../models/key";
import { TokenExpireDateError } from "../utils/error/errors";
import handle from "../utils/handle";
import KeyPermission from "../models/key-permission";
import response from "../utils/response";

const productPermission: RequestHandler = async (req, res, next) => {
    handle(async () => {
        const { headers, method, url } = req;

        const key = await Key.findOne({ key: headers.key });

        if (dayjs().isAfter(key.expireDate)) throw new TokenExpireDateError();

        const keyHasPermission = await KeyPermission.exists(
            {
                key: key._id,
                product: url.split('/')[1],
                methods: method.toLowerCase()
            }
        );

        if (!keyHasPermission) return next(response.forbiddenError());

        next();
    }, next);
};

export default productPermission;

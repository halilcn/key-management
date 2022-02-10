import { RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';

import handle from "../../utils/handle";
import response from "../../utils/response";
import Key from "../../models/key";
import { TokenError } from "../../utils/error/errors";


export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const keys = await Key
            .find({ user: req.user._id })
            .select('name key expireDate createdAt updatedAt');

        next(response.success({ keys }));
    }, next);
};

export const store: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { validated } = req;

        validated.key = uuidv4();
        validated.user = req.user._id;

        await Key.create(validated);

        next(response.created());
    }, next);
};

//todo:permissions

export const update: RequestHandler = (req, res, next) => {
    handle(async () => {
        return res.json(req.validated);

        const key = await Key.findOneAndUpdate(
            {
                user: req.user._id, _id: req.params.keyId
            }, {});
        if (!key) throw new TokenError();

        next(response.success());
    }, next);
};

export const destroy: RequestHandler = (req, res, next) => {
    handle(async () => {
        const key = await Key.findOneAndDelete({ user: req.user._id, _id: req.params.keyId });
        if (!key) throw new TokenError();
        next(response.success());
    }, next);
};

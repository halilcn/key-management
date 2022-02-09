import { RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';

import handle from "../../utils/handle";
import response from "../../utils/response";
import Key from "../../models/key";

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

//todo:token yoksa token yok diye mesaj döndürme, bunu throw error ile fırlatıp, handle içinde yakalama ?
export const destroy: RequestHandler = (req, res, next) => {
    handle(async () => {
        const key = await Key.findOneAndDelete({ user: req.user._id, _id: req.params.keyId });
        if (!key) return next(response.error());
        next(response.success());
    }, next);
};

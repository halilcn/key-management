import { RequestHandler } from "express";

import handle from "../../utils/handle";
import response from "../../utils/response";
import User from "../../models/user";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { name, surname, email } = req.user;

        next(response.success({ name, surname, email }));
    }, next);
};

export const update: RequestHandler = (req, res, next) => {
    handle(async () => {
        await User.findOneAndUpdate({ _id: req.user._id }, { ...req.validated });
        next(response.success());
    }, next);
};


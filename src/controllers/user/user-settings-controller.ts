import { RequestHandler } from "express";

import handle from "../../utils/handle";
import response from "../../utils/response";
import User from "../../models/user";
import sendResetEmail from "../../jobs/send-reset-email";
import UserResetEmailCode from "../../models/user-reset-email-code";

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

export const resetEmailCode: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { email } = req.validated;
        const code = Math.floor(100000 + Math.random() * 900000);

        await UserResetEmailCode.findOneAndDelete({ email, user: req.user._id });
        await UserResetEmailCode.create({ email, code, user: req.user._id });

        await sendResetEmail(email, { code });

        next(response.created());
    }, next);
};



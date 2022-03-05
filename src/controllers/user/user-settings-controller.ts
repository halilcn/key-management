import { RequestHandler } from "express";
const fs = require('fs');
import dayjs from "dayjs";

import handle from "../../utils/handle";
import response from "../../utils/response";
import User from "../../models/user";
import sendResetEmail from "../../jobs/send-reset-email";
import UserResetEmailCode from "../../models/user-reset-email-code";
import { UserResetEmailCodeError, UserResetEmailCodeExpireDateError } from "../../utils/error/errors";

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

export const resetEmail: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { email, code } = req.body;

        const userResetEmailCode = await UserResetEmailCode.findOne({ email, code, user: req.user._id });

        if (!userResetEmailCode) throw  new UserResetEmailCodeError();
        if (dayjs().isAfter(userResetEmailCode.expireDate)) throw new UserResetEmailCodeExpireDateError();

        await User.findOneAndUpdate({ _id: req.user._id }, { email });
        await UserResetEmailCode.findOneAndDelete({ email, code, user: req.user._id });

        next(response.success());
    }, next);
};

export const updateImage: RequestHandler = (req, res, next) => {
    handle(async () => {
        const file = req.file;

        const { image } = await User.findOne({_id:req.user._id})
        fs.unlinkSync(image);

        await User.findOneAndUpdate({_id:req.user._id},{image:file?.path})

        next(response.success({path:file?.path}))
    }, next);
};
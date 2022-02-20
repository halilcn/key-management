import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';

import User from "../../models/user";
import handle from "../../utils/handle";
import response from "../../utils/response";
import sendRegisterCode from '../../jobs/send-register-code';
import sendResetPassword from '../../jobs/send-reset-password';
import UserRegisterCode from "../../models/user-register-code";
import { ExistsUserError, UserRegisterCodeError, UserRegisterCodeExpireDateError } from "../../utils/error/errors";
import UserResetPassword from "../../models/user-reset-password";

export const login: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { email, password } = req.validated;
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) return next(response.authenticationError());

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_TOKEN as string, {});

        user.tokens.push({ token, name: 'web' });
        await user.save();

        next(response.success({ token }));
    }, next);
};

export const register: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { validated } = req;

        const deletedRegisterCode = await UserRegisterCode.findOneAndDelete({
            email: validated.email,
            code: validated.code
        });

        if (!deletedRegisterCode) throw new UserRegisterCodeError();
        if (dayjs().isAfter(deletedRegisterCode.expireDate)) throw new UserRegisterCodeExpireDateError();

        validated.password = await bcrypt.hash(validated.password, 10);
        await User.create(validated);

        next(response.created());
    }, next);
};

export const registerCode: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { email } = req.validated;
        const code = Math.floor(100000 + Math.random() * 900000);

        await UserRegisterCode.findOneAndDelete({ email });
        await UserRegisterCode.create({ email, code });

        await sendRegisterCode(email, { code });

        next(response.created());
    }, next);
};

export const resetPasswordEmail: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { email } = req.validated;
        const key = uuidv4();

        await UserResetPassword.findOneAndDelete({ email });

        const existsUser = await User.exists({ email });
        if (!existsUser) throw new ExistsUserError();

        await UserResetPassword.create({ email, key });
        await sendResetPassword(email, { resetPasswordLink: `${process.env.APP_FRONTEND}api/v1/user-actions/reset-password/${key}` });

        next(response.created());
    }, next);
};

//todo:token'ların hepisini sil ! (reset password !)


export const logout: RequestHandler = (req, res, next) => {
    handle(async () => {
        req.user.tokens.filter(({ token }: any) => token != req.currentToken);

        await req.user.save();

        next(response.success());
    }, next);
};

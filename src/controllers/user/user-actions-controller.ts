import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../../models/user";
import handle from "../../utils/handle";
import response from "../../utils/response";
import sendRegisterCode from '../../jobs/send-register-code';
import UserRegisterCode from "../../models/user-register-code";

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
        return res.send('ok');


        const { validated } = req;

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

export const logout: RequestHandler = (req, res, next) => {
    handle(async () => {
        req.user.tokens.filter(({ token }: any) => token != req.currentToken);

        await req.user.save();

        next(response.success());
    }, next);
};

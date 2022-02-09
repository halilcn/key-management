import jwt from 'jsonwebtoken';
import { RequestHandler } from "express";

import handle from "../utils/handle";
import response from "../utils/response";
import User from "../models/user";

interface IDecodedUser {
    user_id: string,
    iat: number
}

const auth: RequestHandler = (req, res, next) => {
    handle(async () => {
            const token = req.header("Authorization") as string;
            const decodedUser = jwt.verify(token, process.env.JWT_TOKEN as string) as IDecodedUser;

            const user = await User.findById(decodedUser.user_id);

            const userHasToken = user.tokens.some(({ token }: any) => token == req.currentToken);
            if (!userHasToken) throw Error('Wrong user id');

            req.user = user;
            req.currentToken = token;

            next();
        },
        next,
        () => {
            next(response.authenticationError());
            return true;
        });
};

export default auth;

import jwt from 'jsonwebtoken';
import { RequestHandler } from "express";
import handle from "../utils/handle";
import response from "../utils/response";
import User from "../models/user";

//todo:!!
declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

interface IDecodedUser {
    user_id: string,
    iat: number
}

const auth: RequestHandler = (req, res, next) => {
    handle(async () => {
            const token = req.header("Authorization") as string;
            const decodedUser = jwt.verify(token, process.env.JWT_TOKEN as string) as IDecodedUser;

            const user = await User.findById(decodedUser.user_id);
            if (!user) throw Error('Wrong user id');

            req.user = user;
            next();
        },
        next,
        () => {
            next(response.authenticationError());
            return true;
        });
};

export default auth;

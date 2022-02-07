import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import handle from "../../utils/handle";
import User from "../../models/User";
import response from "../../utils/response";

export const login: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { validated } = req;

        const token = jwt.sign(
            { user_id: 1, email: "test@gmail.com" },
            "token_key",
            {
                expiresIn: "24h",
            }
        );

        res.send(token);
    }, next);
};


export const register: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { validated } = req;
        //todo: bcrypt özellikleri ?
        validated.password = await bcrypt.hash(validated.password, 10);
        await User.create(validated);
        next(response.created());
    }, next);
};

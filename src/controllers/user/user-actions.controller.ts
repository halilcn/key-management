import { RequestHandler } from "express";
import bcrypt from 'bcrypt';


import handle from "../../utils/handle";
import User from "../../models/User";
import response from "../../utils/response";

export const login = () => {

};


export const register: RequestHandler = (req, res, next) => {
    handle(async () => {
        //todo: sadece validated olanları al !

        const validatedValues = req.validated;
        validatedValues.password = await bcrypt.hash(validatedValues.password, 10);
        return res.json(validatedValues);

        next(response.created());
    }, next);
};

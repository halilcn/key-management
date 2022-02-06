import {RequestHandler} from 'express';
import handle from "../utils/handle";
import response from "../utils/response";
import User from '../models/User';


export const indexTest: RequestHandler = async (req, res, next) => {
    await handle(async () => {
        //todo: 500 error http code

        // await User.create({name: 'test'});

        return next(response.success());

        throw new Error('test');
        res.send('ok problem yok')
    }, next)
};

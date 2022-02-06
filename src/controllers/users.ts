import {RequestHandler} from 'express';
import handle from "../utils/handle";
import response from "../utils/response";
import User from '../models/User';


export const indexTest: RequestHandler = async (req, res, next) => {
    await handle(async () => {
        await User.create({name: 'test'});

        return  next(response.created());

        throw new Error('test');
        res.send('ok problem yok')
    }, next)
};

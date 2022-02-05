import {RequestHandler} from 'express';
import handle from "../utils/handle";
import response from "../utils/response";

export const indexTest: RequestHandler = async (req, res, next) => {
    await handle(async () => {
        throw new Error('test');
        res.send('ok problem yok')
    }, next)
};

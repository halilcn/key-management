import {RequestHandler} from 'express';
import handle from "../utils/handle";
import response from "../utils/response";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const indexTest: RequestHandler = async (req, res, next) => {
    return next(response.success());

    await handle(async () => {
        throw new Error('test');
        res.send('ok problem yok')
    }, next)
};

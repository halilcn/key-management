import {RequestHandler} from 'express';
import response from "../utils/response";
import handle from "../utils/handle";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const indexTest: RequestHandler = async (req, res, next) => {
    await handle(async (res) => {
        await sleep(500);
        throw new Error('test');
        res.send('ok problem yok')
    })
    //next(response.success());
};

import {RequestHandler} from 'express';
import handle from "../utils/handle";
import response from "../utils/response";
import User from '../models/user';


export const index: RequestHandler = async (req, res, next) => {
    await handle(async () => {
        //todo: 500 error http code

        // await User.create({name: 'test'});

        return next(response.success());

        throw new Error('test');
        res.send('ok problem yok')
    }, next)
};

export const store: RequestHandler = async (req, res, next) => {
    await handle(async () => {
        //todo: sadece validated olanları al !
        console.log(req.body)

        await User.create(req.body)
        next(response.created())
    }, next, (err) => {
        console.log(err)
        res.send('hata !')
        return true;
    })
}

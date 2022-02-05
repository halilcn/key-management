//todo: dışarda type tanımlaması !
//todo: types !!!
//handle: Function
import response from "./response";
import {NextFunction} from "express";

interface IHandle {
    handle: Function;
    next: NextFunction;
    customCatch: Function;
}

//todo:

export default async (handle: Function, next: NextFunction, customCatch: Function = () => {
}) => {
    try {
        await handle();
    } catch (err: Object | unknown) {
        if (err) if (await customCatch(err)) return;
        console.log('bir hata oluştu')
        next({
            message: 'hata !',
            status: 400
        })
        // res.send('bir hat aşıldı')
    }
}

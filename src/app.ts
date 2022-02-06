import express from "express";
import response from "./utils/response";

const app = express();

require('./bootstrap');
require('./middlewares')(app)
require('./routes')(app)

app.use((req, res, next) => {
    next(response.notFound())
})

app.use((err: any, req: any, res: any, next: any) => {
    //todo: hata geldiğinde log'a yazılabilir
    console.log(err);

    res.locals.message = err.message;
    res.locals.error = process.env.APP_ENVIRONMENT === 'development' ? err : {};

    const status = err.status || 500;

    delete err['status'];

    if (process.env.APP_ENVIRONMENT !== 'development') {
        delete err['stack'];
    }

    res
        .status(status)
        .send({...err});
})

export default app

import express from "express";

//todo: bootstrap
require('dotenv').config()

const app = express();

require('./middlewares')(app)

require('./routes')(app)

//todo: handle method oluşturmak ?
//todo: function types

app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Not Found'
    })
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

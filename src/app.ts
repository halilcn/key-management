import express from "express";
import response from "./utils/response";
import logger from "./utils/logger";

const app = express();

require('./bootstrap');
require('./middlewares')(app)
require('./routes')(app)

app.use((req, res, next) => {
    next(response.notFound())
})

app.use((err: any, req: any, res: any, next: any) => {
    res.locals.message = err.message;
    res.locals.error = process.env.APP_ENVIRONMENT === 'development' ? err : {};

    delete err['status'];

    if (process.env.APP_ENVIRONMENT !== 'development') delete err['stack'];

    // Write a log if there is an error
    if (String(err.status).split('')[0] != '2') logger.warn({...err})

    res.status(err.status || 500).send({...err});
})

export default app

import express from "express";
import rateLimit from "express-rate-limit";

import response from "./utils/response";
import logger from "./utils/logger";

const app = express();

//todo:cache mekanizması (logs index method için)
//todo:socket.io kullanımı
//todo:testlerin yazımı

app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false
    })
);

require('./bootstrap');
require('./types');
require('./middlewares')(app);
require('./routes')(app);

app.use((req, res, next) => {
    next(response.notFound());
});

app.use((err: any, req: any, res: any, next: any) => {
    res.locals.message = err.message;
    res.locals.error = process.env.APP_ENVIRONMENT === 'development' ? err : {};

    // Write a log if there is an error
    if (String(err.status).split('')[0] != '2') logger.warn({ ...err });

    if (process.env.APP_ENVIRONMENT !== 'development') delete err['stack'];

    res.status(err.status || 500).send({ ...err });
});

export default app;

import createError from 'http-errors';
import express from "express";

const app = express();

require('./middlewares')(app)

require('./routes')(app)


// catch 404 and forward to error handler
/*
* app.use((req: any, res: any, next: any) => {
    next(createError(404));
});*/

// error handler
app.use((req: any, res: any) => {
    console.log('geldi !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    return res.json({status: 'error'})

  /*  res.locals.message = res.message;
    res.locals.error = process.env.APP_ENVIRONMENT === 'development' ? res : {};

    console.warn(err);

    res.status(err.status || 500);
    res.send(
        process.env.APP_ENVIRONMENT === 'development'
            ? {stack: err.stack, message: err.message}
            : {message: err.message}
    );*/
});

export default app

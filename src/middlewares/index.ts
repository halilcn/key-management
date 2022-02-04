//import cookieParser from 'cookie-parser';

import logger from 'morgan';
import helmet from 'helmet';
import express from 'express';

module.exports = (app: any) => {
//    app.use(cookieParser());

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(helmet());
};

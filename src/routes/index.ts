import { Express } from "express";

import usersRouter from "./v1/users";
import userActions from "./v1/user-actions";

module.exports = (app: Express) => {
    const v1 = '/api/v1/';

    // API v1 routes
    app.use(`${v1}user-actions`, userActions);

    app.use('/v1/users', usersRouter);
};

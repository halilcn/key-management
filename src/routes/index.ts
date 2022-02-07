import usersRouter from "./v1/users";
import userActions from "./v1/userActions";
import {Express} from "express";

module.exports = (app: Express) => {
    // API v1 routes
    app.use('/v1/user-actions', userActions);

    app.use('/v1/users', usersRouter);
};

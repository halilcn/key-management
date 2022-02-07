import usersRouter from "./v1/users";
import {Express} from "express";

module.exports = (app: Express) => {
    // API v1 routes
    app.use('/v1/users', usersRouter);
};

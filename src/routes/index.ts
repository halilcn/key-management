import usersRouter from "./users";
import app from "../app";

module.exports = (app: any) => {
//    app.use(cookieParser());

    app.use('/users', usersRouter);
};

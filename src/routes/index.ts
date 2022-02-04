import usersRouter from "./users";

module.exports = (app: any) => {
//    app.use(cookieParser());
    app.use('/users', usersRouter);
};

import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from "express";
import handle from "../utils/handle";
import response from "../utils/response";

interface test extends JwtPayload {
    user_id: string,
}


const auth: RequestHandler = (req, res, next) => {
    handle(async () => {
        const token = req.get("Authorization") as string;

        //todo::
        const decodedUser: string = jwt.verify(token, process.env.JWT_TOKEN as string) as string;
        console.log(typeof decodedUser);
        console.log(decodedUser);

        return res.send(token);

        //todo: sorgu atılır. req.user içine user bilgileri girilir. next ile devam edilir.
        //todo: token geçersiz ya da yoksa 401 döndürülür.

        console.log(token);
        return res.send('ok');
        return next();
    }, next, (err) => {
        console.log(err);
        next(response.authenticationError());
        return true;
    });
};

export default auth;

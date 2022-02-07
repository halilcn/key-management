import jwt from 'jsonwebtoken';
import { RequestHandler } from "express";


const auth: RequestHandler = (req, res, next) => {
    console.log('token geldi !');
    const token = req.get("Authorization");

    //todo: try - catch içine alınsa ?
    const decoded = jwt.verify(token as string, 'token_key');
    console.log(decoded);

    //todo: sorgu atılır. req.user içine user bilgileri girilir. next ile devam edilir.
    //todo: token geçersiz ya da yoksa 401 döndürülür.

    console.log(token);
    return next();

    /*
     * if (!token) {
     return res.status(403).send("A token is required for authentication");
     }
     try {
     const decoded = jwt.verify(token, config.TOKEN_KEY);
     req.user = decoded;
     } catch (err) {
     return res.status(401).send("Invalid Token");
     }
     return next();*/
};

export default auth;

import { RequestHandler } from "express";

export const index: RequestHandler = (req, res, next) => {
    res.send('ok');
};

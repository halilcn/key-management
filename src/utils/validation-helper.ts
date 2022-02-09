import { validationResult, matchedData } from 'express-validator';
import { Request, Response, NextFunction } from "express";

import response from "./response";

const addItemToRequest = (req: Request): void => {
    req.validated = matchedData(req);
};

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(response.invalidInput(errors.array()));
    addItemToRequest(req);
    next();
};
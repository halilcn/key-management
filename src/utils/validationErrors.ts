import {validationResult} from 'express-validator';
import {Request, Response, NextFunction} from "express";

import response from "./response";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(response.invalidInput(errors.array()));
    next();
};

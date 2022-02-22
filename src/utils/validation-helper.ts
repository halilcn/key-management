import { validationResult, matchedData } from 'express-validator';
import { Request, Response, NextFunction } from "express";

import response from "./response";

const addItemToRequest = (req: Request): void => {
    const clearedRequiredItems: any = {};
    const validationMatchedData = matchedData(req);

    Object.keys(validationMatchedData).filter(key => {
        if (validationMatchedData[key] != undefined) clearedRequiredItems[key] = validationMatchedData[key];
    });

    req.validated = clearedRequiredItems;
};

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(response.invalidInput(errors.array()));
    addItemToRequest(req);
    next();
};

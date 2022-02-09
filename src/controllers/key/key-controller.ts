import { RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';

import handle from "../../utils/handle";
import response from "../../utils/response";
import Key from "../../models/key";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { userId } = req.params;
        console.log(userId);
        next(response.success());
    }, next);
};

export const store: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { validated } = req;

        validated.key = uuidv4();
        validated.user = req.user._id;

        await Key.create(validated);

        next(response.created());
    }, next);
};

import { RequestHandler } from "express";

import response from "../../utils/response";

export const index: RequestHandler = (req, res, next) => {
    next(response.success({ version:process.env.API_VERSION}));
};
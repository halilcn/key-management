import { NextFunction } from "express";

import response from "./response";
import logger from "./logger";
import CustomError from "./error/custom-error";

interface Handle {
    (handle: Function, next: NextFunction, customCatch?: (err: Object | unknown) => boolean): void;
}

const handle: Handle = async (
    handle,
    next,
    customCatch = () => {
        return false;
    }) => {
    try {
        await handle();
    } catch (err: any) {
        if (err) if (customCatch(err)) return;
        logger.warn(err);
        err.name == CustomError.name
            ? next(response.error(err.message))
            : next(response.error());
    }
};

export default handle;

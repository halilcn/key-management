import response from "./response";
import { NextFunction } from "express";
import logger from "./logger";

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
    } catch (err: Object | unknown) {
        if (err) if (customCatch(err)) return;
        logger.warn(err);
        next(response.error());
    }
};

export default handle;

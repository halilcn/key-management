import { RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';

import handle from "../../utils/handle";
import response from "../../utils/response";
import Key from "../../models/key";
import { TokenError } from "../../utils/error/errors";
import KeyPermission from "../../models/key-permission";

//todo: izinleride döndür.
export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const keys = await Key
            .find({ user: req.user._id })
            .select('name key expireDate createdAt updatedAt');

        next(response.success({ keys }));
    }, next);
};

export const store: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { validated } = req;

        validated.key = uuidv4();
        validated.user = req.user._id;

        const createdKey = await Key.create(validated);
        validated.permissions.map((item: any) => {
            item.key = createdKey._id;
            return item;
        });
        await KeyPermission.create(validated.permissions);

        next(response.created());
    }, next);
};

export const update: RequestHandler = (req, res, next) => {
    handle(async () => {
        const updatedOrCreatedProducts: string[] = []; //type ?
        const { validated } = req;

        const updatedKey = await Key.findOneAndUpdate({
            user: req.user._id, _id: req.params.keyId
        }, validated);

        if (!updatedKey) throw new TokenError();

        await Promise.all(validated.permissions.map(async ({ product, methods }: any) => {
            const updatedKeyPermission = await KeyPermission.findOneAndUpdate({
                key: updatedKey._id,
                product
            }, {
                methods
            });

            if (!updatedKeyPermission) await KeyPermission.create({ key: updatedKey._id, product, methods });
            updatedOrCreatedProducts.push(product);
        }));

        //todo: bunun olumsuzu olacak
        await KeyPermission.where('product').in(updatedOrCreatedProducts).remove();

        next(response.success());
    }, next);
};

export const destroy: RequestHandler = (req, res, next) => {
    handle(async () => {
        const keyDeleted = await Key.findOneAndDelete({ user: req.user._id, _id: req.params.keyId });

        if (!keyDeleted) throw new TokenError();

        next(response.success());
    }, next);
};

export const refresh: RequestHandler = (req, res, next) => {
    handle(async () => {
        const keyUpdated = await Key.findOneAndUpdate({
                user: req.user._id,
                _id: req.params.keyId
            },
            {
                key: uuidv4()
            }
        );

        if (!keyUpdated) throw new TokenError();

        next(response.success());
    }, next);
};

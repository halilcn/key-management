import { RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';

import handle from "../../utils/handle";
import response from "../../utils/response";
import Key from "../../models/key";
import { TokenError, TokenLimitError, TokenPermissionError } from "../../utils/error/errors";
import KeyPermission from "../../models/key-permission";
import constants from "../../constants";

export const index: RequestHandler = (req, res, next) => {
    handle(async () => {
        const keys = await Key
            .find({ user: req.user._id })
            .select('name key expireDate createdAt updatedAt')
            .lean();

        const permissionsOfKey = await KeyPermission
            .where('key')
            .in(keys.map(item => item._id))
            .find();

        keys.map((key: any) => {
            key.permissions = permissionsOfKey
                .filter(permission => String(permission.key) == String(key._id))
                .map(({ _id, product, methods, createdAt, updatedAt }: any) => {
                    return {
                        _id,
                        product,
                        methods,
                        createdAt,
                        updatedAt
                    };
                });
        });

        next(response.success({ keys }));
    }, next);
};

export const store: RequestHandler = (req, res, next) => {
    handle(async () => {
        const { validated } = req;
        const userId = req.user._id;

        const tokensCountOfUser = await Key.count({ user: userId });
        if (tokensCountOfUser > constants.KEYS_LIMIT) throw new TokenLimitError();

        validated.key = uuidv4();
        validated.user = userId;

        const createdKey = await Key.create(validated);
        validated.permissions.map((item: any) => {
            item.key = createdKey._id;
        });
        await KeyPermission.create(validated.permissions);

        next(response.created());
    }, next);
};

export const show: RequestHandler = (req, res, next) => {
    handle(async () => {
        const key = await Key
            .findOne({
                user: req.user._id,
                _id: req.params.keyId
            })
            .select('name key expireDate createdAt updatedAt')
            .lean();

        const permissionsOfKey = await KeyPermission
            .find({ key: key._id })
            .lean();

        key.permissions = permissionsOfKey.map(({ _id, product, methods, createdAt, updatedAt }: any) => {
            return {
                _id,
                product,
                methods,
                createdAt,
                updatedAt
            };
        });

        next(response.success({ key }));
    }, next);
};

export const update: RequestHandler = (req, res, next) => {
    handle(async () => {
        const updatedOrCreatedProducts: string[] = [];
        const { validated } = req;

        const updatedKey = await Key.findOneAndUpdate({
            user: req.user._id,
            _id: req.params.keyId
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

        await KeyPermission
            .find({
                product: { $nin: updatedOrCreatedProducts },
                key: updatedKey._id
            })
            .remove();

        next(response.success());
    }, next);
};

export const destroy: RequestHandler = (req, res, next) => {
    handle(async () => {
        const keyDeleted = await Key.findOneAndDelete({ user: req.user._id, _id: req.params.keyId });
        if (!keyDeleted) throw new TokenError();

        const permissionOfKeyDeleted = await KeyPermission.deleteMany({ key: req.params.keyId });
        if (!permissionOfKeyDeleted) throw new TokenPermissionError();

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

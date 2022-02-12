import { body, } from "express-validator";

import validationHelper from "../../../utils/validation-helper";
import constants from "../../../constants";

export default [
    body('name')
        .if(body('name').exists())
        .isString()
        .not()
        .isEmpty(),
    body('expireDate')
        .if(body('expireDate').exists())
        .isDate()
        .isAfter(),
    body('permissions')
        .default([])
        .if(body('permissions').exists())
        .isArray(),
    body('permissions.*.product')
        .exists()
        .isIn(Object.values(constants.PRODUCT_SLUGS)),
    body('permissions.*.methods')
        .isArray(),
    body('permissions.*.methods.*')
        .isString()
        .isIn(Object.values(constants.METHOD_PERMISSIONS)),
    validationHelper
];

import { body } from "express-validator";

import validationHelper from "../../../utils/validation-helper";
import constants from "../../../constants";

export default [
    body('name')
        .isString()
        .not()
        .isEmpty(),
    body('expireDate')
        .isDate()
        .isAfter(),
    body('permissions')
        .default([])
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

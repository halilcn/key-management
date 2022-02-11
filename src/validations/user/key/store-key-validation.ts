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
        .exists(),
    //.isIn(['sada']),//todo: !
    body('permissions.*.methods')
        .isArray()
        .isIn(Object.values(constants.METHOD_PERMISSIONS)),
    validationHelper
];

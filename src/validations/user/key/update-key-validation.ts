import { body, } from "express-validator";

import validationHelper from "../../../utils/validation-helper";

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
    validationHelper
];

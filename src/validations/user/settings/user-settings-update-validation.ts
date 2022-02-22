import { body } from "express-validator";

import validationHelper from "../../../utils/validation-helper";

export default [
    body("name")
        .isString()
        .isLength({ max: 20 })
        .not()
        .isEmpty(),
    body("surname")
        .isString()
        .isLength({ max: 20 })
        .not()
        .isEmpty(),
    validationHelper
];

import { body } from "express-validator";

import validationHelper from "../../../utils/validation-helper";

export default [
    body("name")
        .if(body("name").exists())
        .isString()
        .isLength({ max: 20 })
        .not()
        .isEmpty(),
    body("surname")
        .if(body("surname").exists())
        .isString()
        .isLength({ max: 20 })
        .not()
        .isEmpty(),
    validationHelper
];

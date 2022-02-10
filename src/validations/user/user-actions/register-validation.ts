import { body } from "express-validator";

import validationHelper from "../../../utils/validation-helper";
import { unique } from "../../../utils/custom-validations";
import User from "../../../models/user";

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
    body("email")
        .isEmail()
        .custom(async email => {
            await unique(User, { email });
        }),
    body("password")
        .exists(),
    validationHelper
];

import { body } from "express-validator";

import validationHelper from "../../../utils/validation-helper";
import { unique } from "../../../utils/custom-validations";
import User from "../../../models/user";

export default [
    body("email")
        .isEmail()
        .custom(async email => {
            await unique(User, { email });
        })
        .not()
        .isEmpty(),
    validationHelper
];

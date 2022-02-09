import { body } from "express-validator";

import validationHelper from "../../../utils/validation-helper";

export default [
    body("email").isEmail(),
    body("password").exists(),
    validationHelper
];

import { body } from "express-validator";

import validationHelper from "../../utils/validationHelper";

export default [
    body("email").isEmail(),
    body("password").exists(),
    validationHelper
];

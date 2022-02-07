import {body} from "express-validator";

import validationHelper from "../utils/validationHelper";
import {unique} from "../utils/customValidations";
import User from "../models/User";


export default [
    body("name").isString().isLength({max: 20}),
    body("surname").isString().isLength({max: 20}),
    body("email").isEmail().custom(async val => {
        await unique(User, {email: val});
    }),
    body("password").isString(),
    validationHelper
]

import { body } from "express-validator";

import validationHelper from "../../utils/validation-helper";

export default [
    body('name').isString().not().isEmpty(),
    body('expireDate').isDate().isAfter(),
    validationHelper
];

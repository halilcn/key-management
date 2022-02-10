import { body, } from "express-validator";

import validationHelper from "../../../utils/validation-helper";
import { mayBeExists } from "../../../utils/custom-validations";

export default [
    body('name').custom(async value => {
        await mayBeExists(value, 'string');
    }),
    body('expireDate').isDate({ format: 'YYYY/MM/DD' }).isAfter(),
    validationHelper
];

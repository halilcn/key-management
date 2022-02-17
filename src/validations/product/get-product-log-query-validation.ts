import { query } from "express-validator";

import validationHelper from "../../utils/validation-helper";

export default [
    query('startDate')
        .if(query('startDate').exists())
        .isDate(),
    query('endDate')
        .if(query('endDate').exists())
        .isDate(),
    validationHelper
];

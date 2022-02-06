const {body} = require('express-validator');
import validationErrors from "../utils/validationErrors";

export default [
    body('email').isEmail(),
    validationErrors
]

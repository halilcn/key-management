import testValidation from "../validations/testValidation";

var express = require('express');
var router = express.Router();
import {indexTest} from '../controllers/users';


router.get('/', testValidation, indexTest);

export default router;

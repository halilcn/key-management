var express = require('express');
var router = express.Router();
import {indexTest} from '../controllers/users';

router.get('/',indexTest);

export default router;

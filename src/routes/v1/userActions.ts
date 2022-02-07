import express from "express";

import * as userActions from '../../controllers/user/user-actions.controller';
import storeUserValidation from "../../validations/user/registerValidation";
import loginValidation from "../../validations/user/loginValidation";
import auth from "../../middlewares/auth";

const router = express.Router();


router.post('/register', storeUserValidation, userActions.register);
router.post('/login', loginValidation, userActions.login);
router.post('/test-auth', auth, loginValidation);

export default router;

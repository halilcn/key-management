import express from "express";

import * as userActions from '../../controllers/user/user-actions-controller';
import storeUserValidation from "../../validations/user/register-validation";
import loginValidation from "../../validations/user/login-validation";
import auth from "../../middlewares/auth";

const router = express.Router();

//todo: auth middleware ?


router.post('/register', storeUserValidation, userActions.register);
router.post('/login', loginValidation, userActions.login);
router.post('/logout', auth, userActions.logout);
router.post('/test-auth', auth, userActions.test);

export default router;

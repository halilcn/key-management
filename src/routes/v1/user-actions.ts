import express from "express";

import * as userActionsController from '../../controllers/user/user-actions-controller';
import storeUserValidation from "../../validations/user/user-actions/register-validation";
import loginValidation from "../../validations/user/user-actions/login-validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post('/register', storeUserValidation, userActionsController.register);
router.post('/login', loginValidation, userActionsController.login);
router.post('/logout', auth, userActionsController.logout);

export default router;

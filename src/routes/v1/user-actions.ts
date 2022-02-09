import express from "express";

import * as userActionsController from '../../controllers/user/user-actions-controller';
import storeUserValidation from "../../validations/user/register-validation";
import loginValidation from "../../validations/user/login-validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post('/register', storeUserValidation, userActionsController.register);
router.post('/login', loginValidation, userActionsController.login);
router.post('/logout', auth, userActionsController.logout);

export default router;

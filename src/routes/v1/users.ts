import express from "express";

import * as userController from '../../controllers/users';
import storeUserValidation from "../../validations/user/user-actions/register-validation";

const router = express.Router();


router.get('/', userController.index);
router.post('/', storeUserValidation, userController.store);

export default router;

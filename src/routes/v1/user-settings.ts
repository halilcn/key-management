import express from "express";

import * as userSettingsController from '../../controllers/user/user-settings-controller';
import userSettingsValidation from "../../validations/user/settings/user-settings-update-validation";
import userResetEmailValidation from "../../validations/user/settings/user-reset-email-validation";


const router = express.Router();

router.get('/', userSettingsController.index);
router.put('/', userSettingsValidation, userSettingsController.update);
router.post('/reset-email/code', userResetEmailValidation, userSettingsController.resetEmailCode);
router.post('/reset-email', userSettingsController.resetEmail);
router.post('/reset-email', userSettingsController.resetEmail);

export default router;

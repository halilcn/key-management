import express from "express";

import * as userSettingsController from '../../controllers/user/user-settings-controller';
import userSettingsValidation from "../../validations/user/settings/user-settings-update-validation";
import userResetEmailValidation from "../../validations/user/settings/user-reset-email-validation";
import storeProfileImage from "../../utils/image/storeProfileImage";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get('/', auth, userSettingsController.index);
router.put('/', auth, userSettingsValidation, userSettingsController.update);
router.put('/image', auth, storeProfileImage.single('image'), userSettingsController.updateImage);
router.post('/reset-email/code', userResetEmailValidation, userSettingsController.resetEmailCode);
router.post('/reset-email', userSettingsController.resetEmail);

export default router;

import express from "express";

import * as userSettingsController from '../../controllers/user/user-settings-controller';
import userSettingsValidation from "../../validations/user/settings/user-settings-update-validation";


const router = express.Router();

//todo:user  change user settings api
router.get('/', userSettingsController.index);
router.put('/', userSettingsValidation, userSettingsController.update);

export default router;

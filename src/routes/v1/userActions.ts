import express from "express";

import * as userActions from '../../controllers/user/user-actions.controller';
import storeUserValidation from "../../validations/storeUserValidation";

const router = express.Router();


router.post('/register', storeUserValidation, userActions.register);

export default router;

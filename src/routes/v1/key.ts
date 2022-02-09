import express from "express";

import * as tokenController from '../../controllers/user/key-controller';
import storeKeyValidation from "../../validations/user/key/store-key-validation";

const router = express.Router({ mergeParams: true });

router.get('/', tokenController.index);
router.post('/', storeKeyValidation, tokenController.store);

export default router;

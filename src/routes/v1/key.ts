import express from "express";

import * as tokenController from '../../controllers/key/key-controller';
import storeKeyValidation from "../../validations/key/store-key-validation";

const router = express.Router({ mergeParams: true });

router.get('/', tokenController.index);
router.post('/', storeKeyValidation, tokenController.store);

export default router;

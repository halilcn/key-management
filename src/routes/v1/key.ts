import express from "express";

import * as tokenController from '../../controllers/user/key-controller';
import storeKeyValidation from "../../validations/user/key/store-key-validation";
import updateKeyValidation from "../../validations/user/key/update-key-validation";

const router = express.Router({ mergeParams: true });

router.get('/', tokenController.index);
router.post('/', storeKeyValidation, tokenController.store);
router.put('/:keyId', updateKeyValidation, tokenController.update);
router.delete('/:keyId', tokenController.destroy);
router.post('/:keyId/refresh', tokenController.refresh);

export default router;

import express from "express";

import * as tokenController from '../../controllers/key/key-controller';

const router = express.Router({ mergeParams: true });

router.get('/', tokenController.index);
router.post('/', tokenController.store);

export default router;

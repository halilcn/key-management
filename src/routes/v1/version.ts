import express from "express";

import * as versionController from '../../controllers/version/version-controller';

const router = express.Router();

router.get('/', versionController.index);

export default router;

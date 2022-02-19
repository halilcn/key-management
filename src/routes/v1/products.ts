import express from "express";

import * as weatherController from '../../controllers/product/weather';
import * as waterTemperatureController from '../../controllers/product/water-temperature';

const router = express.Router({ mergeParams: true });

router.get('/weather', weatherController.index);
router.get('/water-temperature', waterTemperatureController.index);

export default router;

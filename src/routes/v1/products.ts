import express from "express";

import * as weatherController from '../../controllers/product/weather';

const router = express.Router({ mergeParams: true });



router.get('/weather/', weatherController.index);

export default router;

import express from "express";

import * as productLogsController from '../../controllers/product/product-logs';

const router = express.Router({ mergeParams: true });

//todo: bu ürün olmayabilir. O zaman boş döndür
router.get('/:product', productLogsController.index);

export default router;

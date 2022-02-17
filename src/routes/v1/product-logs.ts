import express from "express";

import * as productLogsController from '../../controllers/product/product-logs';
import getProductLogValidation from "../../validations/product/get-product-log-query-validation";

const router = express.Router({ mergeParams: true });

//todo: bu ürün olmayabilir. O zaman boş döndür
router.get('/:product', getProductLogValidation, productLogsController.index);

export default router;

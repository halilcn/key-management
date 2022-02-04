var express = require('express');
var router = express.Router();
import createError from "http-errors";

router.get('/', (req: any, res: any, next: any) => {
    res.json({status: 'success', message: 'Welcome to API'});
});

export default router;

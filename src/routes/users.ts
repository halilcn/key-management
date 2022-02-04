var express = require('express');
var router = express.Router();
import response from '../utils/response';

const validate = (req: any, res: any, next: any) => {
    next(response.success('asdasd'));

    //next(response.authError());

    //next({message: 'afasda', status: 400});
    /* try {
         throw new Error('hata')
     } catch (err) {
         next(err)
     }*/
};

router.get('/',
    validate
);

export default router;

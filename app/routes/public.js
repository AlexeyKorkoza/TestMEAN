

import express from 'express';
import indexController from '../controllers/indexController';

const router = express();

router.get('/', indexController.mainPage);

export default router;

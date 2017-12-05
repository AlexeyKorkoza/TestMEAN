'use strict';

import express from 'express';
import publicController from '../controllers/publicController';
const router = express();

router.get('/', publicController.mainPage);

export default router;
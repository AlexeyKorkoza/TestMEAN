'use strict';

import express from 'express';
import app from './app';
import publicRoute from './public';
import auth from './authentication';
const router = express();

router.use('/api/v1', app);
router.use('/', auth);
router.use('/', publicRoute);

export default router;

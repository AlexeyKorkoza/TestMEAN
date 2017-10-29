'use strict';

import express from 'express';
import app from './app';
const router = express();

router.use('/api/v1', app);

export default router;

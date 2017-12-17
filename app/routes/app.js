'use strict';

import express from 'express';
import places from './places';
import types from './types';
import profile from './profile';
const router = express();

router.use('/places', places);
router.use('/types', types);
router.use('/profile', profile);

export default router;

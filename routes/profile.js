'use strict';

import express from 'express';
import token from '../middlewares/token';
import profileController from '../controllers/profileController';
const router = express();

router.get('/:id', token.required, profileController.getProfile);
router.put('/:id', token.required, profileController.updateProfile);

export default router;
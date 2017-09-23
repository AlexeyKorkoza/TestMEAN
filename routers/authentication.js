'use strict';

import express from 'express';
import authController from '../controllers/authController';
const router = express();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

export default router;

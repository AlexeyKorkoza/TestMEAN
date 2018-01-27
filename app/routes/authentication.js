'use strict';

import express from 'express';
import authController from '../controllers/authController';
const router = express();

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/signup', authController.signUpPage);
router.post('/signup', authController.signUp);
router.get('/app', authController.mainPage);
router.get('/logout', authController.logout);

export default router;

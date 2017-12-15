'use strict';

import express from 'express';
import {
    isLoggedIn,
    loadAuthUserMiddleware
} from '../middlewares/auth';
import authController from '../controllers/authController';
const router = express();

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/signup', authController.signUpPage);
router.post('/signup', authController.signUp);
router.get('/app', authController.mainPage);

export default router;

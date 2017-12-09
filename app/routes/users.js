'use strict';

import express from 'express';
import token from '../middlewares/token';
import userController from '../controllers/userController';
const router = express();

router.get('/', token.required, userController.getUser);

export default router;

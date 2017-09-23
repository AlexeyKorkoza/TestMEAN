'use strict';

import express from 'express';
import userController from '../controllers/userController';
const router = express();

router.get('', userController.getUser);
router.get('/edit/:username', userController.getUserByUsername);
router.put('/edit/:username', userController.updateInfo);

export default router;

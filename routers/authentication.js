import express from "express";
import authController from '../controllers/authController';
var router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

module.exports = router;

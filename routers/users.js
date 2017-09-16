import express from "express";
import userController from '../controllers/userController';
var router = express.Router();

router.get("", userController.getUser);
router.get("/edit/:username", userController.getUserByUsername);
router.put("/edit/:username", userController.updateInfo);
router.put("/edit/:username", userController.updatePassword);

module.exports = router;

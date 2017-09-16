import express from "express";
import path from "path";
import places from '../controllers/placeController';
import types from '../controllers/typeController';
import users from '../controllers/userController';
import auth from '../controllers/authController';
var router = express.Router();

router.use("/places", places);
router.use("/types", types);
router.use("/auth", auth);
router.use("/user", users);
router.get("*", errorPath);

module.exports = router;

function errorPath(req, res) {
  res.sendFile(path.resolve("./index.html"));
}

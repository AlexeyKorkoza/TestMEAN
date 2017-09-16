import express from "express";
import path from "path";
import typeModel from "../models/type";
import placeModel from "../models/place";
import passport from "passport";
var router = express.Router();

router.use("/places", require("./places"));
router.use("/types", require("./types"));
router.use("/auth", require("./authentication")(passport));
router.use("/user", require("./users"));
router.get("*", errorPath);

module.exports = router;

function errorPath(req, res) {
  res.sendFile(path.resolve("./index.html"));
}

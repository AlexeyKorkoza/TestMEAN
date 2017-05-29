var express = require("express");
var path = require("path");
var router = express.Router();
var typeModel = require("../models/type");
var placeModel = require("../models/place");
var passport = require("passport");

router.use("/places", require("./places"));
router.use("/types", require("./types"));
router.use("/auth", require("./authentication")(passport));
router.use("/user", require("./users"));
router.get("*", errorPath);

module.exports = router;

function errorPath(req, res) {
  res.sendFile(path.resolve("./index.html"));
}

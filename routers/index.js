var express = require("express");
var path = require("path");
var router = express.Router();
var typeModel = require("../models/type");
var placeModel = require("../models/place");
var passport = require("passport");

router.use("/places", require("./places"));
router.use("/types", require("./types"));
router.use("/auth", require("./authentication")(passport));
router.use("/users", require("./users"));

router.post("", function(req, res) {
  if (req.body.allPlaces === "allPlaces") {
    placeModel.find(function(err, places) {
      if (err) res.send(err);
      res.json(places);
    });
  }

  if (req.body.allTypes === "allTypes") {
    typeModel.find(function(err, types) {
      if (err) res.send(err);
      res.json(types);
    });
  }

  if (req.body.type) {
    placeModel.find({ id_type: req.body.type }, function(err, types) {
      if (err) res.send(err);
      res.json(types);
    });
  }
});

router.delete("", function(req, res) {
  res.status(200).send("Log out is success");
});

router.get("*", function(req, res) {
  res.sendFile(path.resolve("./index.html"));
});

module.exports = router;
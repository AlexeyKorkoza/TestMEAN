var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
var mongoose = require("mongoose");
var crypto = require("crypto");
var config = require("../config");

router.get("/:id", getUserById);
router.put("/:id", updateInfo);
router.put("/:id", updatePassword);

module.exports = router;

function getUserById(req, res) {
  userModel.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
}

function updateInfo(req, res, next) {
  userModel.findOne(
    { _id: req.params.id, password: req.body.password },
    function(err, user) {
      if (err) {
        res.send(err);
      }
      if (user) {
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.confirmpassword = req.body.confirmpassword;
        user.date = req.body.date;
        user.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.send(user);
          }
        });
      }
      if (!user) {
        next();
      }
    }
  );
}

function updatePassword(req, res) {
  userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      password: encrypt(req.body.password)
    },
    function(err, user) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(user);
      }
    }
  );
}

function encrypt(text) {
  var cipher = crypto.createCipher(
    config.get("algorithm"),
    config.get("passwordAlgorithm")
  );
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

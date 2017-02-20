var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.get('/', function (req, res) {
  userModel.find({}, function (err, users) {
    if (err)
      res.send(err);
    res.send(users);
  });
});

router.post('/', function (req, res) {
  userModel.find({"username": req.body.username}, function (err, user) {
    if (err)
      res.send(err);
    res.send(user);
  });
});

module.exports = router;

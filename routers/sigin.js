var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var jwt = require('jsonwebtoken');
var token = jwt.sign({foo: 'bar'}, 'shhhhh');

router.get('/', function (req, res) {
  userModel.find({}, function (err, users) {
    if (err)
      res.send(err);
    res.send(users);
  });
});

router.post('/', function (req, res) {
  userModel.findOne({"username": req.body.username}, function (err, user) {
    if (err)
      res.send(err);
    res.send({"token": token});
  });
});

module.exports = router;

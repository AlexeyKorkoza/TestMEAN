var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var mongoose = require('mongoose');

router.get('/:currentUser', function (req, res) {
  userModel.findOne({'username': req.params.currentUser}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

router.put('/:currentUser', function (req, res) {
  userModel.findOneAndUpdate({'username': req.params.currentUser}, {
    "username": req.body.username,
    "email": req.body.email,
    "password": req.body.password,
    "confirmpassword": req.body.confirmpassword,
    "date": req.body.date
  }, function (err, user) {
    if (err)
      res.send(err);
    res.status(200).send(user);
  })
});

module.exports = router;
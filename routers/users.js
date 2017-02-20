var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var mongoose = require('mongoose');

router.get('/:id', function (req, res) {
  userModel.find({'_id': req.params.id}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

router.put('/:id', function (req, res) {
  userModel.findOneAndUpdate({"_id": req.body._id}, {
    "username": req.body.username, "email": req.body.email, "password": req.body.password,
    "confirmpassword": req.body.confirmpassword, "date": req.body.date
  }, function (err, user) {
    if (err)
      res.send(err);
    res.status(200).send(user);
  })
});

module.exports = router;
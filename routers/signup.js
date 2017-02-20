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
  userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      date: req.body.date
    }, function (err) {
      if (err)
        res.send(err);
      else res.send("User created!");
    }
  );
});

module.exports = router;

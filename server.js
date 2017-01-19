var express = require('express');
var config = require('./config');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var typeModel = require('./models/type');
var placeModel = require('./models/place');
var userModel = require('./models/user');
var app = express();

mongoose.connect('mongodb://localhost:27017/interactive_map');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + ''));
app.use(methodOverride());

app.post('', function (req, res) {

  if (req.body.allPlaces === "allPlaces") {
    placeModel.find(function (err, places) {
      if (err)
        res.send(err);
      res.json(places);
    });
  }

  if (req.body.allTypes === "allTypes") {
    typeModel.find(function (err, types) {
      if (err)
        res.send(err);
      res.json(types);
    });
  }

  if (req.body.type) {
    placeModel.find({'id_type': req.body.type}, function (err, types) {
      if (err)
        res.send(err);
      res.json(types);
    });
  }

});

app.delete('', function (req, res) {
  res
    .status(200)
    .send("Log out is success");
});

app.get('/signup', function (req, res) {
  userModel.find({}, function (err, users) {
    if (err)
      res.send(err);
    res.send(users);
  });
});

app.get('/signin', function (req, res) {
  userModel.find({}, function (err, users) {
    if (err)
      res.send(err);
    res.send(users);
  });
});

app.post('/signin', function (req, res) {
  res
    .status(200)
    .send("Sign in is success");
});

app.post('/signup', function (req, res) {
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

app.get('/users/:username', function (req, res) {
  userModel.find({'username': req.params.username}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

app.put('/users/:username', function (req, res) {
  userModel.findOneAndUpdate({"_id": req.body._id}, {
    "username": req.body.username, "email": req.body.email, "password": req.body.password,
    "confirmpassword": req.body.confirmpassword, "date": req.body.date
  }, function (err, user) {
    if (err)
      res.send(err);
    res.status(200).send(user);
  })
});

app.listen(config.port, function () {
  console.log("Express server listening on port " + config.port);
});
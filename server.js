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
var multer = require('multer');
var app = express();

mongoose.connect('mongodb://localhost:27017/interactive_map');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + ''));
app.use(methodOverride());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, req.body.typename + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

var upload = multer({
  storage: storage
}).single('file');

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

app.get('/signin', function (req, res) {
  userModel.find({}, function (err, users) {
    if (err)
      res.send(err);
    res.send(users);
  });
});

app.post('/signin', function (req, res) {
  userModel.find({"username": req.body.username}, function (err, user) {
    if (err)
      res.send(err);
    res.send(user);
  });
});

app.get('/users/:id', function (req, res) {
  userModel.find({'_id': req.params.id}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

app.put('/users/:id', function (req, res) {
  userModel.findOneAndUpdate({"_id": req.body._id}, {
    "username": req.body.username, "email": req.body.email, "password": req.body.password,
    "confirmpassword": req.body.confirmpassword, "date": req.body.date
  }, function (err, user) {
    if (err)
      res.send(err);
    res.status(200).send(user);
  })
});

app.get('/types', function (req, res) {
  typeModel.find({}, function (err, types) {
    if (err)
      res.send(err);
    res.send(types);
  })
});

app.post('/types', function (req, res) {
  upload(req, res, function (err) {
    typeModel.create({
      id_type: req.body.id_type,
      name_type: req.body.typename,
      marker_img: req.body.typename
    });
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

app.listen(config.port, function () {
  console.log("Express server listening on port " + config.port);
});
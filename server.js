var express = require('express');
var config = require('./config');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var multer = require('multer');
var app = express();

mongoose.connect('mongodb://localhost:27017/interactive_map');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + ''));
app.use(methodOverride());

app.use(function (req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.use(require('./routers'));

app.listen(config.port, function (error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log("Express server listening on port " + config.port);
  }
});
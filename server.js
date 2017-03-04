var express = require('express');
var config = require('./config');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('db'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + ''));
app.use(methodOverride());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./Passport/passport-init');
initPassport(passport);

app.use(require('./routers'));

app.listen(config.get('port'), function (error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log("Express server listening on port " + config.get('port'));
  }
});
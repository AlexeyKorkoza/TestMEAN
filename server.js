var express = require('express');
var config = require('./config');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + ''));

app.listen(config.port, function () {
  console.log("Express server listening on port " + config.port);
});
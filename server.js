import express from "express";
import config from "./config";
import morgan from "morgan";
import bodyParser from "body-parser";
import serveStatic from "serve-static";
import methodOverride from "method-override";
import mongoose from "mongoose";
import passport from "passport";
import fs from "fs";
import flash from "connect-flash";
import session from "express-session";
import cors from 'cors';
import routers from './routers';
var app = express();

mongoose.connect(config.get("db"));
var db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(err){
  console.log(err);
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(
  session({
    secret: "passport",
    resave: false,
    saveUnitialized: false
  })
);
app.use(passport.initialize());
app.use(flash());
app.use(serveStatic(__dirname + ""));

app.use(cors());

app.use('/', routers);

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

var initPassport = require("./Passport/passport-init");
initPassport(passport);

var port = process.env.PORT || config.get("port");
app.listen(port);

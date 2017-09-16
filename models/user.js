import mongoose from "mongoose";
import config from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  date: String
});

userSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    config.get("secret")
  );
};

userSchema.methods.validPasswrod = function(user, password) {
  return bcrypt.compareSync(password, user.password);
};

userSchema.methods.generatePassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var User = mongoose.model("User", userSchema);

module.exports = User;

var mongoose = require("mongoose");
var config = require("../config");
var jwt = require("jsonwebtoken");
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
  var flag = true;
  if (decrypt(user.password) !== password) {
    flag = false;
  }
  return flag;
};

userSchema.methods.generatePassword = function(text) {
  var cipher = crypto.createCipher(
    config.get("algorithm"),
    config.get("passwordAlgorithm")
  );
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

var User = mongoose.model("User", userSchema);

module.exports = User;

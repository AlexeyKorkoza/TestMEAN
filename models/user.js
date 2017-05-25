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
})

userSchema.methods.generateJWT = function(){

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, config.get('secret'));

}

var User = mongoose.model("User", userSchema);

module.exports = User;

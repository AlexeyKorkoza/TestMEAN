var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = mongoose.model("User", {
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

module.exports = User;

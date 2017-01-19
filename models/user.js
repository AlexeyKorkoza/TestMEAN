var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  confirmpassword: String,
  date: String
});

module.exports = User;
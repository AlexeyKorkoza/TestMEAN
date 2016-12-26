var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Type = mongoose.model('Type', {
  id_type: Number,
  name_type: String,
  marker_img: String
});

module.exports = Type;
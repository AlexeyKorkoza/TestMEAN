var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Type = mongoose.model('Type', {
  id_type: Number,
  name_type: {
    type: String,
    unique: true
  },
  marker_img: {
    type: String,
    unique: true
  },
  image: String
});

module.exports = Type;
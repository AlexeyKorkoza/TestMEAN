var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Place = mongoose.model('Place', {
  id_place: Number,
  name_place: String,
  description: String,
  coordinateX: {
    type: String,
    unique: true
  },
  coordinateY: {
    type: String,
    unique: true
  },
  address: String,
  id_type: Number
});

module.exports = Place;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Place = mongoose.model('Place', {
  id_place: Number,
  name_place: String,
  description: String,
  coordinateX: String,
  coordinateY: String,
  address: String,
  id_type: Number
});

module.exports = Place;
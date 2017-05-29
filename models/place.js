var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Place = mongoose.model("Place", {
  name_place: String,
  description: String,
  lat: {
    type: String,
    unique: true
  },
  lng: {
    type: String,
    unique: true
  },
  address: String,
  id_type: Number
});

module.exports = Place;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Place = mongoose.model('Place', {
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

export default Place;

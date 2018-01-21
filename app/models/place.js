import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Place = mongoose.model('Place', {
  name_place: String,
  description: String,
  lat: String,
  lng: String,
  address: String,
  id_type: Number,
  date: {
    type: Date,
    default: Date.now()
  }
});

export default Place;

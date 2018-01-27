import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Place = mongoose.model('Place', {
  name: String,
  description: String,
  lat: String,
  lng: String,
  address: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

export default Place;

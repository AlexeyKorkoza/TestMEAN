import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Place = mongoose.model('Place', {
  _id: Schema.Types.ObjectId,
  name_place: String,
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

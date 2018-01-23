import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Type = mongoose.model('Type', {
  _id: Schema.Types.ObjectId,
  name_type: {
    type: String,
    unique: true
  },
  image: String,
  date: {
    type: Date,
    default: Date.now()
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place'
    }
  ]
});

export default Type;
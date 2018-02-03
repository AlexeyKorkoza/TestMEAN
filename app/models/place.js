import mongoose from 'mongoose';

const { Schema } = mongoose;

const placeSchema = new Schema({
    name: String,
    description: String,
    lat: String,
    lng: String,
    address: String,
    date: {
        type: Date,
        default: Date.now(),
    },
});

const Place = mongoose.model('Place', placeSchema);

export default Place;

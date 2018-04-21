import mongoose from 'mongoose';

const { Schema } = mongoose;

const typeSchema = new Schema({
    name: String,
    image: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    places: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Place',
        },
    ],
});

const Type = mongoose.model('Type', typeSchema);

export default Type;

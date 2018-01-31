import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    types: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Type',
        },
    ],
    places: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Place',
        },
    ],
});

userSchema.methods.generateJWT = user => {
    const expiresIn = '7d';
    const payload = {
        id: user._id,
        username: user.username,
    };

    return jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn },
    );
};

const User = mongoose.model('User', userSchema);

export default User;

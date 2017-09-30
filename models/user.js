require('dotenv').config();
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  date: String
});

userSchema.methods.generateJWT = user =>{
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    process.env.JWT_SECRET
  );
};

userSchema.methods.validPasswrod = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

userSchema.methods.generatePassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const User = mongoose.model('User', userSchema);

export default User;

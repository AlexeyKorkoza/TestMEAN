import userModel from '../models/user';
import crypto from 'crypto';
import config from '../config';
import jwt from 'jsonwebtoken';

export default {

  getUser(req, res, next) {

    if (!req.headers.authorization) {
      return res.status(403).end('User not authenticated');
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, config.get('secret'));
    jwt.verify(token, config.get('secret'), err => {
      const userId = decoded.id;
      userModel.findById(userId, (err, user) =>{
        if (err) {
          res.json(err);
        }
        if (user) {
          const token = user.generateJWT();
          res.json({
            user: {
              username: user.username,
              token: token
            }
          });
        }
      });
    });
  },

  getUserByUsername(req, res) {
    userModel.findOne({username: req.params.username}, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  },

  updateInfo(req, res, next) {
    userModel.findOne(
      {username: req.params.username, password: req.body.password},
      (err, user) => {
        if (err) {
          res.send(err);
        }
        if (user) {
          user.username = req.body.username;
          user.email = req.body.email;
          user.password = req.body.password;
          user.confirmpassword = req.body.confirmpassword;
          user.date = req.body.date;
          user.save(err => {
            if (err) {
              res.send(err);
            } else {
              res.send(user);
            }
          });
        }
        if (!user) {
          next();
        }
      }
    );
  },

  updatePassword(req, res) {
    userModel.findOneAndUpdate(
      {username: req.params.username},
      {password: encrypt(req.body.password)},
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(user);
        }
      }
    );
  }
}

function encrypt(text) {
  const cipher = crypto.createCipher(
    config.get('algorithm'),
    config.get('passwordAlgorithm')
  );
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

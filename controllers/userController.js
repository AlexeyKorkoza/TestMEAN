require('dotenv').config();
import User from '../models/user';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default {

  getUser(req, res, next) {

    if (!req.headers.authorization) {
      return res.status(403).end('User not authenticated');
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, process.env.SECRET);
    jwt.verify(token, process.env.JWT_SECRET, () => {
      const userId = decoded.id;
      User.findById(userId, (err, user) => {
        if (err) {
          res.status(500).json(err);
        }
        if (user) {
          const token = user.generateJWT(user);
          res.status(200).json({
            user: {
              username: user.username,
              token: token
            }
          });
        }
      });
    });
  },

  async getUserByUsername(req, res) {
    try {
      const user = await User.findOne({username: req.params.username});
      if (!user) {
        res.status(400).json('User is not found');
      }

      res.status(200).json(user);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async updateInfo(req, res) {
    try {
      if (!req.body.password) {
        const user = new User({
          'username': req.body.username,
          'email': req.body.email
        });

        let result = await User.findById({'_id': req.body._id});
        if (!result) {
          res.status(400).json('Account is not updated');
        }

        result = user.save();
        if (!result) {
          res.status(400).json('Account is not updated');
        }

        res.status(200).json(result);
      } else {
        let user = new User({});
        user.generatePassword(req.body.password);

        let result = await User.findById({'_id': req.body._id});

        if (!result) {
          res.status(400).json('Account is not updated');
        }

        result = await user.save();

        if (!result) {
          res.status(400).json('Account is not updated');
        }

        res.status(200).json('Account is updated');
      }
    }
    catch (err) {
      res.status(500).json(err);
    }
  }
}

function encrypt(text) {
  const cipher = crypto.createCipher(
    process.env.ALGORITHM,
    process.env.PASSWORD_ALGORITHM
  );
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

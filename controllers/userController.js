require('dotenv').config();
import User from '../models/user';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default {

  getUser(req, res, next) {

    if (!req.headers.authorization) {
      return res.status(403).end('User not authenticated');
    }

    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, process.env.SECRET);
    jwt.verify(token, process.env.JWT_SECRET, () => {
      console.log(decoded);
      if (decoded) {
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
      } else {
        res.status(403).json('User is not authenticated');
      }
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

        let user = await User.findById({'_id': req.body._id});
        if (!user) {
          res.status(400).json('Account is not found');
        }

        user.username = req.body.username;
        user.email = req.body.email;

        const result = user.save();
        if (!result) {
          res.status(400).json('Account is not updated');
        }

        res.status(200).json(result);
      } else {

        let user = await User.findById(req.body._id);
        if (!user) {
          res.status(400).json('Account is not found');
        }
        user.password = user.generatePassword(req.body.password);

        const result = await user.save();

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

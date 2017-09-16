import userModel from "../models/user";
import crypto from "crypto";
import config from "../config";
import jwt from "jsonwebtoken";

export default {

  getUser(req, res, next) {

    if (!req.headers.authorization) {
      return res.status(403).end("User not authenticated");
    }

    var token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.decode(token, config.get("secret"));
    jwt.verify(token, config.get("secret"), function (err) {
      var userId = decoded.id;
      userModel.findById(userId, function (err, user) {
        if (err) {
          res.json(err);
        }
        if (user) {
          var token = user.generateJWT();
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
    userModel.findOne({username: req.params.username}, function (err, user) {
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
      function (err, user) {
        if (err) {
          res.send(err);
        }
        if (user) {
          user.username = req.body.username;
          user.email = req.body.email;
          user.password = req.body.password;
          user.confirmpassword = req.body.confirmpassword;
          user.date = req.body.date;
          user.save(function (err) {
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
      function (err, user) {
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
  var cipher = crypto.createCipher(
    config.get("algorithm"),
    config.get("passwordAlgorithm")
  );
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

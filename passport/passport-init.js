var mongoose = require('mongoose');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var config = require('../config');

module.exports = function (passport) {
// Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function (user, done) {
    console.log('serializing user:', user.username);
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log('deserializing user:', user.username);
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({'username': username},
        function (err, user) {
          // In case of any error, return using the done method
          if (err)
            return done(err);
          // Username does not exist, log the error and redirect back
          if (!user) {
            return done(null, false, req.flash('loginMessage', 'Пользователь не найден'));
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)) {
            return done(null, false, req.flash('loginMessage', 'Неверный пароль')); // redirect back to login page
          }
          // User and password both match, return user from done method
          // which will be treated like success
          return done(null, user, req.flash('loginMessage', user._id));
        }
      );
    }
  ));

  passport.use('signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'email',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, email, done) {
      // find a user in mongo with provided username
      User.findOne({'username': username}, function (err, user) {
        // In case of any error, return using the done method
        if (err) {
          return done(err);
        }
        // already exists
        if (user) {
          return done(null, false, req.flash('signUpMessage', 'Данный пользователь уже существует'));
        }
        else {
          User.findOne({'email': email}, function (err, user1) {
            if (err) {
              return done(err);
            }
            // already exists
            if (user1) {
              return done(null, false, req.flash('signUpMessage', 'Данный электронный адрес уже существует'));
            }
            if (!user1) {
              var newUser = new User({
                'username': username,
                'password': encrypt(req.body.password),
                'email': req.body.email,
                'date': req.body.date
              });
              // save the user
              newUser.save(function (err) {
                if (err) {
                  throw err;
                }
                return done(null, newUser);
              });
            }
          });
        }
      });
    })
  );

  function isValidPassword(user, password) {
    var flag = true;
    if (decrypt(user.password) !== password) {
      flag = false;
    }
    return flag;
  }

  function encrypt(text) {
    var cipher = crypto.createCipher(config.get('algorithm'), config.get('passwordAlgorithm'));
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  function decrypt(text) {
    var decipher = crypto.createDecipher(config.get('algorithm'), config.get('passwordAlgorithm'));
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
};
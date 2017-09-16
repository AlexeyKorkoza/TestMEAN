import User from '../models/user';
import passportLocal from 'passport-local';
import config from '../config';
var LocalStrategy = passportLocal.Strategy;

module.exports = function (passport) {
// Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
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
          if (!user.validPasswrod(user, password)) {
            return done(null, false, req.flash('loginMessage', 'Неверный пароль')); // redirect back to login page
          }
          // User and password both match, return user from done method
          // which will be treated like success

          var userData = {
            "username": user.username,
            "token": user.generateJWT()
          }

          return done(null, userData);
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
                'email': req.body.email,
                'date': req.body.date
              });

              newUser.password = newUser.generatePassword(req.body.password);
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
};
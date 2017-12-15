import User from '../models/user';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

module.exports = passport => {

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, done) => {

      User.findOne({'username': username}, (err, user) => {
          
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, req.flash('loginMessage', 'User is not found'));
          }

          if (!user.validPasswrod(user, password)) {
            return done(null, false, req.flash('loginMessage', 'Incorrect password'));
          }

          return done(null, user);
        }
      );
    }
  ));

  passport.use('signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'email',
      passReqToCallback: true
    },
   (req, username, email, done) => {

      User.findOne({'username': username}, (err, user) => {

        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, req.flash('signUpMessage', 'User has already existed'));
        }
        else {
          User.findOne({'email': email}, (err, user) => {
            if (err) {
              return done(err);
            }

            if (user) {
              return done(null, false, req.flash('signUpMessage', 'Email has already existed'));
            }
            if (!user) {
              const newUser = new User({
                'username': username,
                'email': req.body.email,
                'date': req.body.date
              });

              newUser.password = newUser.generatePassword(req.body.password);

              newUser.save(err => {
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
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

      User.findOne({'username': username},
        (err, user) => {
          
          if (err)
            return done(err);

          if (!user) {
            return done(null, false, req.flash('loginMessage', 'Пользователь не найден'));
          }

          if (!user.validPasswrod(user, password)) {
            return done(null, false, req.flash('loginMessage', 'Неверный пароль'));
          }

          const userData = {
            'username': user.username,
            'token': user.generateJWT()
          };

          return done(null, userData);
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
          return done(null, false, req.flash('signUpMessage', 'Данный пользователь уже существует'));
        }
        else {
          User.findOne({'email': email}, (err, user1) => {
            if (err) {
              return done(err);
            }

            if (user1) {
              return done(null, false, req.flash('signUpMessage', 'Данный электронный адрес уже существует'));
            }
            if (!user1) {
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
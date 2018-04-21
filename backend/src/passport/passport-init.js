import passportLocal from 'passport-local';
import User from '../models/user';
import {
    generatePassword,
    checkPassword,
    comparePasswords,
    checkWorstPassword,
} from '../services/password';

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

    passport.use('login', new LocalStrategy(
        {
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            User.findOne({ username })
                .then(user => {
                    if (!user) {
                        return done(null, false, req.flash('loginMessage', 'User is not found'));
                    }

                    if (!checkPassword(user, password)) {
                        return done(null, false, req.flash('loginMessage', 'Incorrect password'));
                    }

                    return done(null, user);
                })
                .catch(err => done(err));
        },
    ));

    passport.use('signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'email',
            passReqToCallback: true,
        },
        (req, username, email, done) => {
            const { password, confirmpassword } = req.body;
            const isWorstPassword = checkWorstPassword(password);
            const isComparePasswords = comparePasswords(password, confirmpassword);

            if (isWorstPassword) {
                return done(null, false, req.flash('signUpMessage', 'Password too weak'));
            }
            if (!isComparePasswords) {
                return done(null, false, req.flash('signUpMessage', 'Passwords don`t compare'));
            }

            return User.findOne({ username })
                .then(user => {
                    if (user) {
                        return done(null, false, req.flash('signUpMessage', 'User has already existed'));
                    }
                    return User.findOne({ email });
                })
                .then(user => {
                    if (user) {
                        return done(null, false, req.flash('signUpMessage', 'Email has already existed'));
                    }

                    let newUser;
                    if (!user) {
                        newUser = new User({
                            username,
                            email,
                            password: generatePassword(password),
                        });
                    }

                    return newUser.save();
                })
                .then(user => done(null, user))
                .catch(err => done(err));
        },
    ));
};

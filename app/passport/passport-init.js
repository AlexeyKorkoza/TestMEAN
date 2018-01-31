import User from '../models/user';
import passportLocal from 'passport-local';
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
            User.findOne({ username }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'User is not found'));
                }

                if (!checkPassword(user, password)) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect password'));
                }

                return done(null, user);
            });
        },
    ));

    passport.use('signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'email',
            passReqToCallback: true,
        },
        (req, username, email, done) => {
            const isWorstPassword = checkWorstPassword(req.body.password);
            const isComparePasswords = comparePasswords(req.body.password, req.body.confirmpassword);

            if (isWorstPassword) {
                return done(null, false, req.flash('signUpMessage', 'Password too weak'));
            }
            if (!isComparePasswords) {
                return done(null, false, req.flash('signUpMessage', 'Passwords don`t compare'));
            }

            User.findOne({ username }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('signUpMessage', 'User has already existed'));
                }

                User.findOne({ email }, (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, req.flash('signUpMessage', 'Email has already existed'));
                    }
                    if (!user) {
                        const newUser = new User({
                            username,
                            email: req.body.email,
                            date: req.body.date,
                            password: generatePassword(req.body.password),
                        });

                        newUser.save(err => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        },
    ));
};

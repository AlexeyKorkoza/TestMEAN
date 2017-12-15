import passport from 'passport';
import token from '../middlewares/token';

export default {

  loginPage(req, res) {
    res.render('../app/views/login.ejs', {});
  },

  login(req, res) {
    passport.authenticate('login', { failureFlash: true }, (err, user) => {
      if (err) {
        if (err.name === 'Incorrect Credentials Error') {
          return res.status(400).json({
             message: 'Incorrect Credentials Error'
          });
        }

        return res.status(400).json({
            messages: 'Could not process the form.'
        });
      } else {
        req.session.user = user;
        return res.status(200).redirect('/app');
      }

    })(req, res);
  },

  signUpPage(req, res) {
    res.render('../app/views/signup.ejs', {});
  },

  signUp(req, res) {
    passport.authenticate('signup', { failureFlash: true }, err => {

      if (err) {
        if (err.name === 'Incorrect Credentials Error') {
          return res.status(400).json({
             message: 'Incorrect Credentials Error'
          });
        }

        return res.status(400).json({
            message: 'Could not process the form.'
        });
      }

      return res.status(200).json({
          message: 'Sign up is successfully'
      });

    })(req, res);
  },

  mainPage(req, res) {
      const tokenForUser = token.generateJWT(req.session.user);
      const user = Object.assign({}, {
        'username': req.session.user.username,
        'email': req.session.user.email,
        'date': req.session.user.date,
        'token': tokenForUser
      });
      console.log(user);
      return res.render('../app/views/app.ejs', {
        user
      });
  }
}
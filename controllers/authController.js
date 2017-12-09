import passport from 'passport';

export default {

  loginPage(req, res) {
    res.render('../views/login.ejs', {});
  },

  login(req, res) {
    passport.authenticate('login', { failureFlash: true }, (err, userData) => {
      if (err) {
        if (err.name === 'Incorrect Credentials Error') {
          return res.status(400).json({
             message: 'Incorrect Credentials Error'
          });
        }

        return res.status(400).json({
            messages: 'Could not process the form.'
        });
      }

      if (userData) {
        return res.status(200).redirect('/app');
      } else {
        return res.status(400).json({
          message: req.flash('loginMessage')[0],
        })
      }

    })(req, res);
  },

  signUpPage(req, res) {
    res.render('../views/signup.ejs', {});
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
      res.render('../views/app.ejs', {});
  }
}
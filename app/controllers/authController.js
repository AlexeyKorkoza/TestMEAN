import passport from 'passport';
import token from '../middlewares/token';
import logger from '../utils/logger';

export default {

    /**
     * @request GET '/api/v1/login
     * @param req
     * @param res
     */
  loginPage(req, res) {
    logger.info('Render login page');
    res.render('../app/views/login.ejs', {});
  },

    /**
     * @request POST '/api/v1/login
     * @param req
     * @param res
     */
  login(req, res) {
    passport.authenticate('login', { failureFlash: true }, (err, user) => {
      if (!user) {
          logger.info('Authentication of user is fail');
          return res.status(403).json(req.flash('loginMessage')[0]);
      }

      logger.info('Authentication of user is success');
      req.session.user = user;
      return res.status(200).redirect('/app');
    })(req, res);
  },

    /**
     * @request GET '/api/v1/signup
     * @param req
     * @param res
     */
  signUpPage(req, res) {
    logger.info('Render signup page');
    res.render('../app/views/signup.ejs', {});
  },

    /**
     * @request POST '/api/v1/signup
     * @param req
     * @param res
     */
  signUp(req, res) {
    passport.authenticate('signup', { failureFlash: true }, (err, user) => {
      if (!user) {
          logger.info('Signup is fail');
          return res.status(403).json(req.flash('signUpMessage')[0]);
      }

      logger.info('Signup is success');
      return res.status(200).json({
          message: 'Sign up is successfully'
      });

    })(req, res);
  },

    /**
     * @request GET '/api/v1/app
     * @param req
     * @param res
     */
  mainPage(req, res) {
      if (!req.session.user) {
          logger.info('User is not authenticated, redirect to login page');
          return res.redirect('/login');
      }
      const tokenForUser = token.generateJWT(req.session.user);
      const user = Object.assign({}, {
        id: req.session.user._id,
        username: req.session.user.username,
        email: req.session.user.email,
        date: req.session.user.date,
      });
      logger.info('Render main page', user);
      return res.render('../app/views/app.ejs', {
        user,
        token: tokenForUser
      });
  },

    /**
     * @request /api/v1/logout
     * @param req
     * @param res
     */
  logout(req, res) {
      logger.info('Logout. Session is destroyed');
      req.session.destroy();
      return res.redirect('/login');
  }
}
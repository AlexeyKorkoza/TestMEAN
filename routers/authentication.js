var express = require('express');
var router = express.Router();

module.exports = function (passport) {
  //sends successful login state back to view(angular)
  router.get('/successSignUp', function (req, res) {
    res.send({state: 'success'});
  });
  //send failure login state back to view(angular)
  router.get('/failureSignUp', function (req, res) {
    res.send({state: 'failure', message: req.flash('signUpMessage')[0]});
  });
  router.get('/successLogin', function (req, res) {
    res.send({state: 'success', id: req.flash('loginMessage')[0]});
  });
  //send failure login state back to view(angular)
  router.get('/failureLogin', function (req, res) {
    res.send({state: 'failure', message: req.flash('loginMessage')[0]});
  });
  //login requeset
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/auth/successLogin',
    failureRedirect: '/auth/failureLogin',
    failureFlash: true
  }));

  //signup request
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/successSignUp',
    failureRedirect: '/auth/failureSignUp',
    failureFlash: true
  }));

  return router;
};
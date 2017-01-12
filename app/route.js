'use strict';

angular.module('myApp')
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/Main/main.html',
        controller: 'mainCtrl'
      })
      .when('/signin', {
        templateUrl: 'app/SignIn/signIn.html',
        controller: 'signInCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/SignUp/signUp.html',
        controller: 'signUpCtrl'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  });
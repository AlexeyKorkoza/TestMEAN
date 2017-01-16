'use strict';

angular.module('myApp')
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/Main/main.html'
      })
      .when('/signin', {
        templateUrl: 'app/SignIn/signIn.html'
      })
      .when('/signup', {
        templateUrl: 'app/SignUp/signUp.html'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  });
'use strict';

var myApp = angular.module('myApp');
myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../../templates/main.html',
      controller: 'mainCtrl'
    })
    .when('/signin', {
      templateUrl: '../../templates/signIn.html',
      controller: 'signInCtrl'
    })
    .when('/signup', {
      templateUrl: '../../templates/signUp.html',
      controller: 'signUpCtrl'
    })
    .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
});
'use strict';

angular
  .module('myApp')
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
      .when('/users/:id', {
        templateUrl: 'app/UserProfile/userProfile.html'
      })
      .when('/types', {
        templateUrl: 'app/TypeOfPlace/Type.html'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  });
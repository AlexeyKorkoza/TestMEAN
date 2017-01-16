'use strict';

angular.module('myApp', [
  'ngRoute',
  'selectize',
  'ng-token-auth'
])

  .config(function ($authProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:8080',
      emailRegistrationPath: '/signup',
      emailSignInPath: '/signin',
      signOutUrl: ' '
    });
  });
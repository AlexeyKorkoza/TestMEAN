'use strict';

angular.module('myApp', [
  'ngRoute',
  'selectize',
  'ng-token-auth'
])

  .config(function ($authProvider) {
    $authProvider.configure({
      apiUrl: '',
      emailRegistrationPath: '/signup',
      emailSignInPath: '/signin',
      signOutUrl: ' '
    });
  });
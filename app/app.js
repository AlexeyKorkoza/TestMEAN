'use strict';

angular
  .module('myApp', [
    'ngRoute',
    'selectize',
    'ng-token-auth',
    'angular-loading-bar',
    'ngAnimate',
    'ngFileUpload'
  ])
  .config(function ($authProvider, cfpLoadingBarProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:8080',
      emailRegistrationPath: '/signup',
      emailSignInPath: '/signin',
      signOutUrl: ' '
    });
    cfpLoadingBarProvider.latencyThreshold = 1000;
  });
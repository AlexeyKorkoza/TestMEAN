'use strict';

var myApp = angular.module('myApp');
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../../templates/main.html',
      controller: 'mainCtrl'
    })
    .otherwise({redirectTo: '/'});
});
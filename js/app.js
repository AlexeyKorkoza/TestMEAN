'use strict';

var myApp = angular.module('myApp', ['ngRoute','selectize']);

myApp.config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
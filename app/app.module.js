"use strict";

angular
  .module("myApp", [
    "ngRoute",
    "selectize",
    "angular-loading-bar",
    "ngAnimate",
    "ngFileUpload",
    "wt.responsive",
    "ui-leaflet",
    "ngStorage"
  ])
  .config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 1000;
  })
  .run(function($rootScope, $http, $location, $localStorage) {
    if ($localStorage.currentUser) {
      $http.defaults.headers.common.Authorization = "Bearer " +
        $localStorage.currentUser.token;
    }
  });

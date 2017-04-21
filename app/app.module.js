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
  .config(config)
  .run(run);

config.$inject = ["cfpLoadingBarProvider"];
run.$inject = ["$http", "$localStorage"];

function config(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.latencyThreshold = 1000;
}

function run($http, $localStorage) {
  if ($localStorage.currentUser) {
    $http.defaults.headers.common.Authorization = "Bearer " +
      $localStorage.currentUser.token;
  }
}

'use strict';

var myApp = angular.module('myApp');
myApp.controller('signInCtrl', function ($scope, $location, $http) {

  $scope.back = function () {
    $location.path('/');
  };

  $scope.submit = function () {
    $scope.formData = {};

    $http({
      url: '/signin',
      data: $scope.formData,
      method: 'POST'
    });
  };

});
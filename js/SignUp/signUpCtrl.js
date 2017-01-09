'use strict';

var myApp = angular.module('myApp');
myApp.controller('signUpCtrl', function ($scope, $http, $location) {

  $scope.back = function () {
    $location.path('/');
  };

  $scope.submit = function (isValid) {

    $scope.formData = {};

    if (isValid) {

      $http({
        url: '/signin',
        data: $scope.formData,
        method: 'POST'
      });

    }
  };

});
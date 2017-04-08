'use strict';

angular
  .module('myApp')
  .controller('signUpCtrl', function ($scope, $http, $location, $timeout, cfpLoadingBar, authenticationService) {

    $scope.back = function () {
      $location.path('/');
    };

    $scope.RegBtnClick = function () {
      $scope.error = "";
      $scope.formData.date = "";
      var date = new Date();
      if (date.getDay() < 10) {
        $scope.formData.date = "0" + date.getDay() + ".";
      } else {
        $scope.formData.date = date.getDay() + ".";
      }
      if (date.getMonth() + 1 < 10) {
        $scope.formData.date += "0" + (date.getMonth() + 1) + "." + date.getFullYear();
      } else {
        $scope.formData.date += date.getMonth() + 1 + "." + date.getFullYear();
      }
      authenticationService.signup($scope.formData)
        .then(function (response) {
          cfpLoadingBar.start();
          if (response.data.state == 'success') {
            $location.path('/');
          }
          if(response.data.state == 'failure'){
            $scope.error = response.data.message;
          }
        })
        .catch(function (response) {
          console.log(response);
        })
        .finally(function () {
          cfpLoadingBar.complete();
        });
    }
  });
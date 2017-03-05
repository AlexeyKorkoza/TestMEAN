'use strict';

angular
  .module('myApp')
  .controller('signInCtrl', function ($scope, $http, $location, $timeout, $localStorage, authenticationService, cfpLoadingBar) {

    $scope.back = function () {
      $location.path('/');
    };

    $scope.LoginBtnClick = function () {
        authenticationService.login($scope.formData)
          .then(function (response) {
            cfpLoadingBar.start();
            if (response.data.state == 'success') {
              $localStorage.currentUser = {username: $scope.formData.username, token: response.token};
              $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
              $location.path('/');
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
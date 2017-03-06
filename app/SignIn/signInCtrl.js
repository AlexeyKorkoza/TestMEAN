'use strict';

angular
  .module('myApp')
  .controller('signInCtrl', function ($scope, $http, $location, $timeout, $localStorage, authenticationService, cfpLoadingBar) {

    $scope.back = function () {
      $location.path('/');
    };

    $scope.LoginBtnClick = function () {
      $scope.error = "";
        authenticationService.login($scope.formData)
          .then(function (response) {
            cfpLoadingBar.start();
            if (response.data.state == 'success') {
              $localStorage.currentUser = {id: response.data.id, username: $scope.formData.username, token: response.token};
              $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
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
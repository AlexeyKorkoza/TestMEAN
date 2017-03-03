'use strict';

angular
  .module('myApp')
  .controller('signInCtrl', function ($scope, $http, $location, $timeout, $localStorage, SignInService, userService, cfpLoadingBar) {

    $scope.getAllUsers = '';
    SignInService.getAllUsers()
      .then(function (response) {
        $scope.getAllUsers = response.data;
      });

    $scope.back = function () {
      $location.path('/');
    };

    $scope.LoginBtnClick = function () {

      var flagUser = false;
      var flagPassword = false;
      $scope.getAllUsers.forEach(function (item) {
        if (item.username === $scope.formData.username) {
          flagUser = true;
        }
        if (item.password !== $scope.formData.password) {
          flagPassword = true;
        }
      });

      if (!flagUser) {
        swal({
          title: '<span style="color:#F8BB86">Запрашиваемый пользователь ' + $scope.formData.username + ' не найден.<span>',
          confirmButtonText: "ОК",
          html: true
        });
      }
      if (!flagPassword) {
        swal({
          title: '<span style="color:#F8BB86">Неверный пароль. Пожалуйста, попробуйте ещё раз.<span>',
          confirmButtonText: "ОК",
          html: true
        });
      }

      if (flagPassword && flagUser) {
        var SignInData = $scope.getAllUsers.filter(function (item) {
          return item.username === $scope.formData.username;
        });
        userService.setUserId(SignInData[0]._id);
        $http.post('/signin', $scope.formData)
          .then(function (response) {
            cfpLoadingBar.start();
            if (response.data.token) {
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
    }
  });
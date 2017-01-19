'use strict';

angular
  .module('myApp')
  .controller('signInCtrl', function ($auth, $scope, $http, $location, $timeout, SignInService, userService, cfpLoadingBar) {

    var getAllUsers = '';
    SignInService.getAllUsers()
      .then(function (response) {
        getAllUsers = response.data;
      });

    $scope.back = function () {
      $location.path('/');
    };

    $scope.LoginBtnClick = function () {

      var flagUser = false;
      var flagPassword = false;
      getAllUsers.forEach(function (item) {
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
        userService.setUserName($scope.formData.username);
        $auth.submitLogin($scope.formData)
          .then(function (response) {
            cfpLoadingBar.start();
            $timeout(function () {
              $location.path('/');
            }, 2000);
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
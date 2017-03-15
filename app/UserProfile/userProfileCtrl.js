'use strict';

angular
  .module('myApp')
  .controller('userProfileCtrl', function ($scope, $location, $routeParams, userService) {

    userService.getUserInfo($routeParams.id)
      .then(function (response) {
        $scope.userData = response.data;
      });

    $scope.update = function () {
      userService.updateUserInfo($routeParams.id, $scope.userData)
        .then(function (response) {
          if (response.data.code) {
            swal("Информация не обновлена", "Повторите попытку", "error");
          }
          else {
            swal("Информация успешно обновлена", "После выхода данные будут успешные применены", "success");
          }
        });

    };

    $scope.updatePassword = function () {
      var data = {
        "username": $scope.userData.username,
        "email": $scope.userData.email,
        "password": $scope.settingPassword.password,
        "date": $scope.userData.date
      };
      userService.updateUserInfo($routeParams.id, data)
        .then(function () {
          swal("Информация успешно обновлена", "После выхода данные будут успешные применены", "success");
        });
    };

  });
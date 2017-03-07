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
          if(response.data.code) {
            swal({
              title: "Информация не обновлена",
              text: "Повторите попытку",
              confirmButtonText: "ОК",
              html: true
            });
          }
          else {
            swal({
              title: "Информация успешно обновлена",
              text: "После выхода данные будут успешные применены",
              confirmButtonText: "ОК",
              html: true
            });
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
          swal({
            title: "Информация успешно обновлена",
            text: "После выхода данные будут успешные применены",
            confirmButtonText: "ОК",
            html: true
          });
        });
    };

  });
'use strict';

angular
  .module('myApp')
  .controller('userProfileCtrl', function ($scope, $location, userService) {

    userService.getUserInfo(userService.getUserId())
      .then(function (response) {
        $scope.userData = response.data[0];
        $scope.username = response.data[0].username;
      });

    $scope.update = function () {
      userService.updateUserInfo($scope.userData.username, $scope.userData)
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
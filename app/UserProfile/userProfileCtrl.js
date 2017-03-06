'use strict';

angular
  .module('myApp')
  .controller('userProfileCtrl', function ($scope, $location, $routeParams, userService) {

    userService.getUserInfo($routeParams.currentUser)
      .then(function (response) {
        $scope.userData = response.data;
      });

    $scope.update = function () {
      userService.updateUserInfo($routeParams.currentUser, $scope.userData)
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
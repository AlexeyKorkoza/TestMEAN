'use strict';

angular.module('myApp')
  .controller('signUpCtrl', function ($auth, $scope, $http, $location,$timeout, SignUpService) {

    var getAllUsers = '';
    SignUpService.getAllUsers()
      .then(function (response) {
        getAllUsers = response.data;
      });

    $scope.back = function () {
      $location.path('/');
    };

    $scope.RegBtnClick = function() {
      var flag = true;
      getAllUsers.forEach(function (item) {
        if (item.username === $scope.formData.username && item.email === $scope.formData.email && flag) {
          swal({
            title: "Укажите другие данные",
            text: '<span style="color:#F8BB86">Указанный пользователь с указанным электронным адресом уже существует<span>',
            confirmButtonText: "ОК",
            html: true
          });
          flag = false;
        }
        else if (item.username === $scope.formData.username && flag) {
          flag = false;
          swal({
            title: "Укажите другие данные",
            text: '<span style="color:#F8BB86">Указанный пользователь уже существует<span>',
            confirmButtonText: "ОK",
            html: true
          });
        }
        else if (item.email === $scope.formData.email && flag) {
          flag = false;
          swal({
            title: "Укажите другие данные",
            text: '<span style="color:#F8BB86">Указанный электронный адрес уже используется.<span>',
            confirmButtonText: "ОK",
            html: true
          });
        }
      });
      if (flag) {
        $auth.submitRegistration($scope.formData)
          .then(function () {
            $timeout(function () {
              $location.path('/');
            }, 2000);
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    }
  });
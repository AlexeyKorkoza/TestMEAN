'use strict';

angular.module('myApp')
  .controller('signInCtrl', function ($scope, $location, $http) {

    var getAllUsers = '';
    $http.get('/signin')
      .then(function (response) {
        getAllUsers = response.data;
      });

    $scope.back = function () {
      $location.path('/');
    };

    $scope.submit = function (isValid) {

      if (isValid) {

        var flag = true;
        getAllUsers.forEach(function (item) {
          if (item.username !== $scope.formData.username && flag) {
            swal({
              title: '<span style="color:#F8BB86">Запрашиваемый пользователь' + $scope.formData.username + 'не найден.<span>',
              confirmButtonText: "ОК",
              html: true
            });
            flag = false;
          } else if (item.password !== $scope.formData.password && flag) {
            swal({
              title: '<span style="color:#F8BB86">Неверный пароль. Пожалуйста, попробуйте ещё раз.<span>',
              confirmButtonText: "ОК",
              html: true
            });
            flag = false;
          }
        });

        /*if (flag) {
         $http.post('/signin', $scope.formData).then(function (data) {
         console.log(data);
         });
         }*/
      }
    };

  });
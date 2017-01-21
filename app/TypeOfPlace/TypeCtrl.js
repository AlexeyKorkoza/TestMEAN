'use strict';

angular
  .module('myApp')
  .controller('TypeCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    var getAllTypes = "";
    typeService.getAllTypes()
      .then(function (response) {
        getAllTypes = response.data;
      });

    $scope.back = function () {
      $location.path('/');
    };

    $scope.add = function (file) {

      var max = 0;
      var flag = true;
      getAllTypes.forEach(function (item) {

        if (item.id_type > max) {
          max = item.id_type;
        }

        if (item.name_type === $scope.addTypeData.typename) {
          flag = false;
        }

      });

      if (flag) {
        file.upload = Upload.upload({
          url: '/types',
          data: {
            typename: $scope.addTypeData.typename, id_type: max + 1, file: file
          }
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
          });
          swal({
            title: "Новый тип успешно добавлен",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "Обновить страницу",
            html: true
          }, function (isConfirm) {
            if (isConfirm) {
              location.reload();
            }
          });
        });
      }
    };

    $scope.update = function () {

    };

  });
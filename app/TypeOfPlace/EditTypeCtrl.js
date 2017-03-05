'use strict';

angular
  .module('myApp')
  .controller('EditTypeCtrl', function ($scope, $location, $timeout, $routeParams, Upload, typeService) {

    typeService.getTypeById($routeParams.id)
      .then(function (response) {
        $scope.typename = response.data.name_type;
      });

    $scope.update = function (file) {
      if (file) {
        Upload.rename(file, $scope.editData.typename);
      }
      typeService.update($routeParams.id, $scope.editData, file).then(function (response) {
        if (response.data.code) {
          swal({
            title: "Тип не отредактирован",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          }), function (isConfirm) {
            if (isConfirm) {
              $location.path('/types');
            }
          }
        } else {
          swal({
            title: "Тип успешно отредактирован",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          }), function (isConfirm) {
            if (isConfirm) {
              $location.path('/types');
            }
          }
        }
      });
    };
  });
'use strict';

angular
  .module('myApp')
  .controller('ViewTypesCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    $scope.types = "";
    typeService.getAllTypes()
      .then(function (response) {
        $scope.types = response.data;
        if($scope.types.length < 1) {
          swal("Список типов объектов пуст", "Пожалуйста, добавьте новый тип объекта", "error");
          $location.url('/types/add');
        }
      });

    $scope.delete = function (id) {
      typeService.delete(id).then(function (response) {
        swal("Тип успешно удален", "Пожалуйста, нажмите ОК для продолжения", "success");
      });
    };

    $scope.add = function () {
      typeService.setTypes($scope.types);
    }

  });
'use strict';

angular
  .module('myApp')
  .controller('ViewTypesCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    $scope.types = "";
    typeService.getAllTypes()
      .then(function (response) {
        $scope.types = response.data;
        if($scope.types.length <= 1) {
          swal({
            title: "Список типов объектов пуст",
            text: '<span style="color:#F8BB86">Пожалуйста, добавьте новый тип объекта<span>',
            confirmButtonText: "ОК",
            html: true
          })
        }
      });

    $scope.add = function () {
      typeService.setTypes($scope.types);
    };

    $scope.delete = function (id) {
      typeService.delete(id).then(function (response) {
        swal({
          title: "Тип успешно удален",
          text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
          confirmButtonText: "ОК",
          html: true
        }), function (isConfirm) {
          if (isConfirm) {
            $location.path('/types');
          }
        }
      });
    };

  });
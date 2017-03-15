'use strict';

angular
  .module('myApp')
  .controller('EditPlaceCtrl', function ($scope, $location, $timeout, $routeParams, typeService, placeService) {

    $scope.myConfig = {
      create: false,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    $scope.select = [];
    typeService.getAllTypes()
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          $scope.select.push({
            value: response.data[i].id_type,
            text: response.data[i].name_type
          })
        }
      });

    placeService.getPlaceById($routeParams.id)
      .then(function (response) {
        $scope.editData = {
          name_place: response.data.name_place,
          description: response.data.description,
          lat: response.data.lat,
          lng: response.data.lng,
          address: response.data.address,
          id_type: response.data.id_type
        }
      });

    $scope.update = function () {
      if($scope.addData.id_type) {
        placeService.update($scope.editData, $routeParams.id).then(function (response) {
          $scope.error = "";
          if (response.data.code) {
            swal("Данные о месте не обновлены", "Проверьте введенные данные", "error");
          } else {
            swal("Данные о месте успешно обновлены", "Пожалуйста, нажмите ОК для продолжения", "success");
            $location.url('/places');
          }
        });
      } else {
        $scope.error = "Выберите тип объекта";
      }
    };
  });
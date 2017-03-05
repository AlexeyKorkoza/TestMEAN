'use strict';

angular
  .module('myApp')
  .controller('EditPlaceCtrl', function ($scope, $location, $timeout, $routeParams, typeService, placeService) {

    $scope.myConfig = {
      create: true,
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
      placeService.update($scope.editData, $routeParams.id).then(function (response) {
        if (response.data.code) {
          swal({
            title: "Данные о месте не обновлены",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          })
        } else {
          swal({
            title: "Данные о месте успешно обновлены",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          }), function (isConfirm) {
            if (isConfirm) {
              $location.path('/places');
            }
          }
        }
      });
    };
  });
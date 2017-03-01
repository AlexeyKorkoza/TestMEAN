'use strict';

angular
  .module('myApp')
  .controller('EditPlaceCtrl', function ($scope, $location, $timeout, typeService, placeService) {

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
    $scope.allPlaces = [].slice.call(placeService.getPlaces());
    $scope.allPlaces.forEach(function (item) {
      if (item._id === placeService.getId()) {
        $scope.editData = {
          _id: placeService.getId(),
          name_place: item.name_place,
          description: item.description,
          lat: item.lat,
          lng: item.lng,
          address: item.address,
          id_type: item.id_type
        }
      }
    });

    $scope.update = function () {
      placeService.update($scope.editData, placeService.getId()).then(function (response) {
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
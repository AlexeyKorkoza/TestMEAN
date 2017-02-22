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
          coordinateX: item.coordinateX,
          coordinateY: item.coordinateY,
          address: item.address,
          id_type: item.id_type
        }
      }
    });

    $scope.update = function () {
      var flag = true;
      $scope.allPlaces.forEach(function (item) {
        if (item.coordinateX === $scope.editData.coordinateX &&
          item.coordinateY === $scope.editData.coordinateY &&
          item.id_type === $scope.editData.id_type) {
          flag = false;
        }
      });

      if (flag) {
        placeService.update($scope.editData, placeService.getId()).then(function (response) {
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
        });
      } else {
        swal({
          title: "Введенные данные были ранее добавлены для данного места",
          text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
          confirmButtonText: "ОК",
          html: true
        }), function (isConfirm) {
          if (isConfirm) {
            $location.path('/places/add');
          }
        }
      }
    };
  });
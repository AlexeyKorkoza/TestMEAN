'use strict';

angular
  .module('myApp')
  .controller('addPlaceCtrl', function ($scope, $location, $timeout, typeService, placeService) {

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

    $scope.add = function () {

      console.log($scope.addData);
      var flag = true;
      /*var getAllPlaces = placeService.getPlaces();
      getAllPlaces.forEach(function (item) {
        if (item.lat === $scope.addData.lat) {
          flag = false;
        }
        if (item.lng === $scope.addData.lng) {
          flag = false;
        }
        if (item.id_type === $scope.addData.id_type) {
          flag = false;
        }
      });*/

      if (flag) {
        placeService.create($scope.addData).then(function (response) {
          swal({
            title: "Новое место успешно добавлено",
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
          title: "Данное место уже добавлено",
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
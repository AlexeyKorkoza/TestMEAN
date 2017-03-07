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
      placeService.create($scope.addData).then(function (response) {
        if (response.data.code) {
          swal({
            title: "Место не добавлено",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          })
        } else {
          swal({
            title: "Место добавлено",
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
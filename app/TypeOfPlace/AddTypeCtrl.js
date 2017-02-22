'use strict';

angular
  .module('myApp')
  .controller('AddTypeCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    $scope.getAllTypes = "";
    $scope.myConfig = {
      create: true,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    $scope.getAllTypes = typeService.getTypes();
    $scope.select = [];
    for (var i = 0; i < $scope.getAllTypes.length; i++) {
      $scope.select.push({
        value: $scope.getAllTypes[i].id_type,
        text: $scope.getAllTypes[i].name_type
      })
    }

    $scope.add = function (file) {

      var max = 0;
      var flag = true;
      $scope.getAllTypes.forEach(function (item) {

        if (item.id_type > max) {
          max = item.id_type;
        }

        if (item.name_type === $scope.addTypeData.typename) {
          flag = false;
        }

      });

      if (flag) {
        typeService.create($scope.addTypeData, max + 1, file).then(function (response) {
          swal({
            title: "Новый тип успешно добавлен",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          }), function (isConfirm) {
            if (isConfirm) {
              $location.path('/types');
            }
          }
        });
      }
    };

  });
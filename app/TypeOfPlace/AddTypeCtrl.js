'use strict';

angular
  .module('myApp')
  .controller('AddTypeCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    var getAllTypes = "";
    $scope.myConfig = {
      create: true,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    getAllTypes = typeService.getTypes();
    $scope.select = [];
    for (var i = 0; i < getAllTypes.length; i++) {
      $scope.select.push({
        value: getAllTypes[i].id_type,
        text: getAllTypes[i].name_type
      })
    }

    $scope.add = function (file) {

      var max = 0;
      var flag = true;
      getAllTypes.forEach(function (item) {

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
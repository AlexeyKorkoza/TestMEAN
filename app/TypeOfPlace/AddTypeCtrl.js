'use strict';

angular
  .module('myApp')
  .controller('AddTypeCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    $scope.filename = "Иконка не выбрана";
    $scope.changeFilename = function (file) {
      if(file) {
        $scope.filename = $scope.addTypeData.file.name;
      } else {
        $scope.filename = "Иконка не выбрана";
      }
    };

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
      Upload.rename(file, $scope.addTypeData.typename);
      var max = 0;
      $scope.getAllTypes.forEach(function (item) {

        if (item.id_type > max) {
          max = item.id_type + 1;
        }

      });
      $scope.addTypeData.id = ++max;
      typeService.create($scope.addTypeData, file).then(function (response) {
        if (response.data.code) {
          swal({
            title: "Новый тип не добавлен",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          }), function (isConfirm) {
            if (isConfirm) {
              $location.path('/types');
            }
          }
        } else {
          $scope.addTypeData = response.data;
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
        }
      });
    };
  });
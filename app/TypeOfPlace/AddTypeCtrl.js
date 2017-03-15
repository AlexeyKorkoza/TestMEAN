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
      if ($scope.getAllTypes.length > 0) {
        max = $scope.getAllTypes[0].id_type;
        $scope.getAllTypes.forEach(function (item) {

          if (item.id_type > max) {
            max = item.id_type;
          }

        });
      }
      max++;
      $scope.addTypeData.id = max;
      typeService.create($scope.addTypeData, file).then(function (response) {
        if (response.data.code) {
          swal("Новый тип не добавлен", "Тип объекта уже существует", "error");
        } else {
          $scope.addTypeData = response.data;
          swal("Новый тип успешно добавлен", "Пожалуйста, нажмите ОК для продолжения", "success");
          $location.url('/types');
        }
      });
    };
  });
'use strict';

angular
  .module('myApp')
  .controller('TypeCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    var getAllTypes = "";
    $scope.myConfig = {
      create: true,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    typeService.getAllTypes()
      .then(function (response) {
        getAllTypes = response.data;
        $scope.select = [];
        for (var i = 0; i < response.data.length; i++) {
          $scope.select.push({
            value: response.data[i].id_type,
            text: response.data[i].name_type
          })
        }
      });

    $scope.back = function () {
      $location.path('/');
    };

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
            confirmButtonText: "Обновить страницу",
            html: true
          }), function (isConfirm) {
            if (isConfirm) {
              $location.path('/');
            }
          }
        });
      }
    };

    $scope.update = function (file) {
      typeService.update($scope.editData, $scope.editData.choosetypename, file).then(function (response) {
        swal({
          title: "Новый тип успешно добавлен",
          text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
          confirmButtonText: "Обновить страницу",
          html: true
        }), function (isConfirm) {
          if (isConfirm) {
            $location.path('/');
          }
        }
      });
    };

  });
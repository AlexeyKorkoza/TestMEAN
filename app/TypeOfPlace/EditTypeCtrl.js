'use strict';

angular
  .module('myApp')
  .controller('EditTypeCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    $scope.getAllTypes = [].slice.call(typeService.getTypes());

    $scope.getAllTypes.forEach(function (item) {
      if (item.id_type === typeService.getId()) {
        $scope.typename = item.name_type;
      }
    });

    $scope.update = function (file) {
      if(file) {
        Upload.rename(file, $scope.editData.typename);
      }
      $scope.editData.id = typeService.getId();
      console.log($scope.editData);
      typeService.update($scope.editData).then(function (response) {
        console.log(response);
        if (response.data.code) {
          swal({
            title: "Тип не отредактирован",
            text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
            confirmButtonText: "ОК",
            html: true
          }), function (isConfirm) {
            if (isConfirm) {
              $location.path('/types');
            }
          }
        } else {
          swal({
            title: "Тип успешно отредактирован",
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
"use strict";

angular
  .module("myApp")
  .controller(
    "EditTypeCtrl",
    function($scope, $location, $timeout, $routeParams, Upload, typeService) {
      $scope.filename = "Иконка не выбрана";
      $scope.changeFilename = function(file) {
        if (file) {
          $scope.filename = $scope.editData.file.name;
        } else {
          $scope.filename = "Иконка не выбрана";
        }
      };

      typeService.getTypeById($routeParams.id).then(function(response) {
        $scope.editData = {
          typename: response.data.name_type
        };
      });

      $scope.update = function(file) {
        if (file) {
          Upload.rename(file, $scope.editData.typename);
        }
        typeService
          .update($routeParams.id, $scope.editData, file)
          .then(function(response) {
            if (response.data.code) {
              swal(
                "Тип не отредактирован",
                "Пожалуйста, проверьте введенные данные",
                "error"
              );
            } else {
              swal(
                "Тип успешно отредактирован",
                "Пожалуйста, нажмите ОК для продолжения",
                "success"
              );
              $location.url("/types");
            }
          });
      };
    }
  );
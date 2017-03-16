"use strict";

angular
  .module("myApp")
  .controller(
    "addPlaceCtrl",
    function($scope, $location, $timeout, typeService, placeService) {
      $scope.myConfig = {
        create: false,
        valueField: "value",
        labelField: "text",
        delimiter: "|",
        placeholder: "Выберите тип объекта",
        maxItems: 1
      };

      $scope.select = [];
      typeService.getAllTypes().then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          $scope.select.push({
            value: response.data[i].id_type,
            text: response.data[i].name_type
          });
        }
      });

      $scope.add = function() {
        if ($scope.addData.id_type) {
          placeService.create($scope.addData).then(function(response) {
            $scope.error = "";
            if (response.data.code) {
              swal("Место не добавлено", "Место уже добавлено", "error");
            } else {
              swal(
                "Место добавлено",
                "Пожалуйста, нажмите ОК для продолжения",
                "success"
              );
              $location.url("/places");
            }
          });
        } else {
          $scope.error = "Выберите тип объекта";
        }
      };
    }
  );
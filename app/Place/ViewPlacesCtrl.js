"use strict";

angular
  .module("myApp")
  .controller(
    "ViewPlacesCtrl",
    function($scope, $location, $timeout, placeService) {
      $scope.places = "";
      placeService.getAllPlaces().then(function(response) {
        $scope.places = response.data;
        if ($scope.places.length < 1) {
          swal("Список мест пуст", "Пожалуйста, добавьте новый место", "error");
          $location.url("/types/add");
        }
      });

      $scope.delete = function(id, index) {
        placeService.delete(id).then(function(response) {
          swal(
            "Место успешно удалено",
            "Пожалуйста, нажмите ОК для продолжения",
            "success"
          );
          $scope.places.splice(index, 1);
        });
      };
    }
  );
"use strict";

angular
  .module("myApp")
  .controller("viewPlacesCtrl", viewPlacesCtrl);

viewPlacesCtrl.$inject = ['$location', 'placeService'];

function viewPlacesCtrl($location, placeService) {

  var vm = this;
  vm.places = "";
  vm.activate = activate;
  vm.remove = remove;

  activate();

  function activate() {

    placeService.getAllPlaces().then(function (response) {
      vm.places = response.data;
      if (vm.places.length < 1) {
        swal("Список мест пуст", "Пожалуйста, добавьте новый место", "error");
        $location.url("/types/add");
      }
    });
  }

  function remove(id, index) {

    placeService.remove(id).then(function (response) {
      swal(
        "Место успешно удалено",
        "Пожалуйста, нажмите ОК для продолжения",
        "success"
      );
      vm.places.splice(index, 1);
    });
  }
}
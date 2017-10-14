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
        swal(
          "List of places is empty",
          "Please, add new place",
          "error"
        );
        $location.url("/types/add");
      }
    });
  }

  function remove(id, index) {

    placeService.remove(id)
      .then(function () {
        swal(
          "Place was removed",
          "Please, click OK for continue",
          "success"
        );
        vm.places.splice(index, 1);
      })
      .catch(function () {
        swal(
          "Place was not removed",
          "Retry",
          "error"
        );
      });
  }
}
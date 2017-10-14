"use strict";

angular
  .module("myApp")
  .controller("addPlaceCtrl", addPlaceCtrl);

addPlaceCtrl.$inject = ['$location', 'typeService', 'placeService'];

function addPlaceCtrl($location, typeService, placeService) {

  var vm = this;
  vm.select = [];
  vm.activate = activate;
  vm.add = add;

  activate();

  function activate() {

    vm.myConfig = {
      create: false,
      valueField: "value",
      labelField: "text",
      delimiter: "|",
      placeholder: "Choose type object",
      maxItems: 1
    };

    typeService.getAllTypes().then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        vm.select.push({
          value: response.data[i].id_type,
          text: response.data[i].name_type
        });
      }
    });

  }

  function add() {
    if (vm.addData.id_type) {
      placeService.create(vm.addData)
        .then(function () {
          swal(
            "Place was added",
            "Please, click ОК for continue",
            "success"
          );
          $location.url("/places");
        })
        .catch(function () {
          swal(
            "Place was not added",
            "Check input data",
            "error"
          );
        });
    } else {
      vm.error = "Choose type object";
    }
  }
}

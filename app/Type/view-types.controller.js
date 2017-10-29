"use strict";

angular
  .module("myApp")
  .controller("viewTypesCtrl", viewTypesCtrl);

viewTypesCtrl.$inject = ['$location', 'typeService'];

function viewTypesCtrl($location, typeService) {

  const vm = this;
  vm.types = "";
  vm.remove = remove;
  vm.add = add;
  vm.activate = activate;

  activate();

  function activate() {
    typeService.getAllTypes()
        .then(response => {
      vm.types = response.data;
      if (vm.types.length < 1) {
        swal(
          "List types is empty",
          "Please, add new type of place",
          "error"
        );
        $location.url("/types/add");
      }
    });
  }

  function remove(id,index) {
    typeService.remove(id)
      .then(() => {
      swal(
        "Type was removed successfully",
        "Please, click ОК for continue",
        "success"
      );
      vm.types.splice(index, 1);
    })
      .catch(() => {
        swal(
          "Type was not removed",
          "Retry",
          "error"
        );
      });
  }

  function add() {
    typeService.setTypes(vm.types);
  }

}
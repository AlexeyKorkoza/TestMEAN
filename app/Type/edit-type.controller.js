"use strict";

angular
  .module("myApp")
  .controller("editTypeCtrl", editTypeCtrl);

editTypeCtrl.$inject = ['$location', '$routeParams', 'Upload', 'typeService'];

function editTypeCtrl($location, $routeParams, Upload, typeService) {

  var vm = this;
  vm.filename = "Icon was not chosen";
  vm.changeFilename = changeFilename;
  vm.update = update;
  vm.activate = activate;

  activate();

  function activate() {
    typeService.getTypeById($routeParams.id).then(function (response) {
      vm.editData = {
        typename: response.data.name_type
      };
    });
  }

  function changeFilename() {
    if (vm.editData.file) {
      vm.filename = vm.editData.file.name;
    } else {
      vm.filename = "Icon was not chosen";
    }
  }

  function update() {
    if (vm.editData.file) {
      Upload.rename(vm.editData.file, vm.editData.typename);
    }
    typeService
      .update($routeParams.id, vm.editData, vm.editData.file)
      .then(function () {
        swal(
          "Type was edited successfully",
          "Please, click ОК for continue",
          "success"
        );
        $location.url("/types");
      })
      .catch(function () {
        swal(
          "Type was not edited",
          "Please, check input data",
          "error"
        );
      });
  }
}
"use strict";

angular
  .module("myApp")
  .controller("editTypeCtrl", editTypeCtrl);

editTypeCtrl.$inject = ['$location', '$routeParams', 'Upload', 'typeService'];

function editTypeCtrl($location, $routeParams, Upload, typeService) {

  var vm = this;
  vm.filename = "Иконка не выбрана";
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
      vm.filename = "Иконка не выбрана";
    }
  }

  function update() {
    if (vm.editData.file) {
      Upload.rename(vm.editData.file, vm.editData.typename);
    }
    typeService
      .update($routeParams.id, vm.editData, vm.editData.file)
      .then(function (response) {
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
  }
}
"use strict";

angular
  .module("myApp")
  .controller("addTypeCtrl", addTypeCtrl);

addTypeCtrl.$inject = ['$location', 'Upload', 'typeService'];

function addTypeCtrl($location, Upload, typeService) {

  var vm = this;
  vm.filename = "Иконка не выбрана";
  vm.getAllTypes = "";
  vm.changeFilename = changeFilename;
  vm.add = add;
  vm.activate = activate;

  activate();

  function activate () {
    vm.getAllTypes = typeService.getTypes();
  }

  function changeFilename() {
    if (vm.addTypeData.file) {
      vm.filename = vm.addTypeData.file.name;
    } else {
      vm.filename = "Иконка не выбрана";
    }
  }

  function add() {
    Upload.rename(vm.addTypeData.file, vm.addTypeData.typename);
    var max = 0;
    if (vm.getAllTypes.length > 0) {
      max = vm.getAllTypes[0].id_type;
      vm.getAllTypes.forEach(function (item) {
        if (item.id_type > max) {
          max = item.id_type;
        }
      });
    }
    max++;
    vm.addTypeData.id = max;
    typeService.create(vm.addTypeData, vm.addTypeData.file)
      .then(function (response) {
        vm.addTypeData = response.data;
        swal(
          "Новый тип успешно добавлен",
          "Пожалуйста, нажмите ОК для продолжения",
          "success"
        );
        $location.url("/types");
    })
      .catch(function () {
        swal(
          "Новый тип не добавлен",
          "Тип объекта уже существует",
          "error"
        );
      });
  }
}
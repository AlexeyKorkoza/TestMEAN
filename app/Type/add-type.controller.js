"use strict";

angular
  .module("myApp")
  .controller("addTypeCtrl", addTypeCtrl);

addTypeCtrl.$inject = ['$location', 'Upload', 'typeService'];

function addTypeCtrl($location, Upload, typeService) {

  var vm = this;
  vm.filename = "Иконка не выбрана";
  vm.changeFilename = changeFilename;
  vm.add = add;

  function changeFilename() {
    if (vm.file) {
      vm.filename = vm.addTypeData.file.name;
    } else {
      vm.filename = "Иконка не выбрана";
    }
  };

  function add(file) {
    Upload.rename(vm.file, vm.addTypeData.typename);
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
    typeService.create(vm.addTypeData, vm.file).then(function (response) {
      if (response.data.code) {
        swal(
          "Новый тип не добавлен",
          "Тип объекта уже существует",
          "error"
        );
      } else {
        vm.addTypeData = response.data;
        swal(
          "Новый тип успешно добавлен",
          "Пожалуйста, нажмите ОК для продолжения",
          "success"
        );
        $location.url("/types");
      }
    });
  };
}
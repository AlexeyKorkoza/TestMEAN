"use strict";

angular
  .module("myApp")
  .controller("viewTypesCtrl", viewTypesCtrl);

viewTypesCtrl.$inject = ['$location', 'typeService'];

function viewTypesCtrl($location, typeService) {

  var vm = this;
  vm.types = "";
  vm.remove = remove;
  vm.add = add;
  vm.activate = activate;

  activate();

  function activate() {
    typeService.getAllTypes().then(function (response) {
      vm.types = response.data;
      if (vm.types.length < 1) {
        swal(
          "Список типов объектов пуст",
          "Пожалуйста, добавьте новый тип объекта",
          "error"
        );
        $location.url("/types/add");
      }
    });
  }

  function remove(id,index) {
    typeService.remove(id)
      .then(function () {
      swal(
        "Тип успешно удален",
        "Пожалуйста, нажмите ОК для продолжения",
        "success"
      );
      vm.types.splice(index, 1);
    })
      .catch(function () {
        swal(
          "Тип не удален",
          "Повторите попытку",
          "error"
        );
      });
  }

  function add() {
    typeService.setTypes(vm.types);
  }

}
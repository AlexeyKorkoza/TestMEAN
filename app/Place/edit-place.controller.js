"use strict";

angular
  .module("myApp")
  .controller("editPlaceCtrl", editPlaceCtrl);

editPlaceCtrl.$inject = ['$location', '$routeParams', 'typeService', 'placeService'];

function editPlaceCtrl($location, $routeParams, typeService, placeService) {

  var vm = this;
  vm.select = [];
  vm.activate = activate;
  vm.update = update;

  activate();

  function activate() {

    vm.myConfig = {
      create: false,
      valueField: "value",
      labelField: "text",
      delimiter: "|",
      placeholder: "Выберите тип объекта",
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

    placeService.getPlaceById($routeParams.id).then(function (response) {
      vm.editData = {
        name_place: response.data.name_place,
        description: response.data.description,
        lat: response.data.lat,
        lng: response.data.lng,
        address: response.data.address,
        id_type: response.data.id_type
      };
    });
  }

  function update() {
    vm.error = '';
    if (vm.editData.id_type) {
      placeService
        .update(vm.editData, $routeParams.id)
        .then(function () {
            swal(
              "Данные о месте успешно обновлены",
              "Пожалуйста, нажмите ОК для продолжения",
              "success"
            );
            $location.url("/places");
        })
        .catch(function () {
          swal(
            "Данные о месте не обновлены",
            "Проверьте введенные данные",
            "error"
          );
        });
    } else {
      vm.error = "Выберите тип объекта";
    }
  }
}
    
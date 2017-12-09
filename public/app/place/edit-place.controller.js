'use strict';

angular
  .module('myApp')
  .controller('editPlaceCtrl', editPlaceCtrl);

editPlaceCtrl.$inject = ['$state', 'typeService', 'placeService'];

function editPlaceCtrl($state, typeService, placeService) {

  const vm = this;
  vm.select = [];
  vm.activate = activate;
  vm.update = update;

  activate();

  function activate() {

    vm.myConfig = {
      create: false,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Choose type object',
      maxItems: 1
    };

    typeService.getAll()
        .then(response => {
      response.data.forEach(item => {
        vm.select.push({
          value: item.id_type,
          text: item.name_type
        });
      })
    });

    placeService.getPlaceById($state.params.id)
        .then(response => {
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
        .update(vm.editData, $state.params.id)
        .then(() => {
            swal(
              'place was updated successfully',
              'Please, click OK for continue',
              'success'
            );
            $state.go('places_all');
        })
        .catch(() => {
          swal(
            'place was not updated',
            'Check input data',
            'error'
          );
        });
    } else {
      vm.error = 'Choose type object';
    }
  }
}
    
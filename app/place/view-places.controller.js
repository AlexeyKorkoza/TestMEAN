'use strict';

angular
  .module('myApp')
  .controller('viewPlacesCtrl', viewPlacesCtrl);

viewPlacesCtrl.$inject = ['$state', 'placeService'];

function viewPlacesCtrl($state, placeService) {

  const vm = this;
  vm.places = '';
  vm.activate = activate;
  vm.edit = edit;
  vm.remove = remove;

  activate();

  function activate() {

    placeService.getAll()
        .then(response => {
      vm.places = response.data;
    });
  }

  function edit(place) {
    $state.go('place.one', { id: place._id });
  }

  function remove(id, index) {

    placeService.remove(id)
      .then(() =>{
        swal(
          'place was removed',
          'Please, click OK for continue',
          'success'
        );
        vm.places.splice(index, 1);
      })
      .catch(() => {
        swal(
          'place was not removed',
          'Retry',
          'error'
        );
      });
  }
}
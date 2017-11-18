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
      if (vm.places.length < 1) {
        swal(
          'List of places is empty',
          'Please, add new place',
          'error'
        );
        $state.go('places_new');
      }
    });
  }

  function edit(place) {
    $state.go('place.one', { id: place._id });
  }

  function remove(id, index) {

    placeService.remove(id)
      .then(() =>{
        swal(
          'Place was removed',
          'Please, click OK for continue',
          'success'
        );
        vm.places.splice(index, 1);
      })
      .catch(() => {
        swal(
          'Place was not removed',
          'Retry',
          'error'
        );
      });
  }
}
listPlacesCtrl.$inject = ['$state', 'placeService'];

function listPlacesCtrl($state, placeService) {

  const vm = this;
  vm.places = '';
  vm.activate = activate;
  vm.remove = remove;

  activate();

  function activate() {

    placeService.getAll()
        .then(response => {
      vm.places = response.data;
    });
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

export default listPlacesCtrl;

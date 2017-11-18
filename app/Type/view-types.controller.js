'use strict';

angular
  .module('myApp')
  .controller('viewTypesCtrl', viewTypesCtrl);

viewTypesCtrl.$inject = ['$state', 'typeService'];

function viewTypesCtrl($state, typeService) {

  const vm = this;
  vm.types = '';
  vm.remove = remove;
  vm.edit = edit;
  vm.activate = activate;

  activate();

  function activate() {
    typeService.getAll()
        .then(response => {
      vm.types = response.data;
      if (vm.types.length < 1) {
        swal(
          'List types is empty',
          'Please, add new type of place',
          'error'
        );
        $state.go('types_new');
      }
    });
  }

  function edit(type) {
    $state.go('types_one', { id: type._id });
  }

  function remove(id,index) {
    typeService.remove(id)
      .then(() => {
      swal(
        'Type was removed successfully',
        'Please, click ОК for continue',
        'success'
      );
      vm.types.splice(index, 1);
    })
      .catch(() => {
        swal(
          'Type was not removed',
          'Retry',
          'error'
        );
      });
  }
}
listTypesCtrl.$inject = ['$state', 'typeService'];

function listTypesCtrl($state, typeService) {

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
    });
  }

  function edit(type) {
    $state.go('types_one', { id: type._id });
  }

  function remove(id,index) {
    typeService.remove(id)
      .then(() => {
      swal(
        'type was removed successfully',
        'Please, click ОК for continue',
        'success'
      );
      vm.types.splice(index, 1);
    })
      .catch(() => {
        swal(
          'type was not removed',
          'Retry',
          'error'
        );
      });
  }
}

export default listTypesCtrl;
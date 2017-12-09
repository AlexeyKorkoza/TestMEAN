'use strict';

angular
  .module('myApp')
  .controller('editTypeCtrl', editTypeCtrl);

editTypeCtrl.$inject = ['$state', 'Upload', 'typeService'];

function editTypeCtrl($state, Upload, typeService) {

  const vm = this;
  vm.filename = 'Icon was not chosen';
  vm.changeFilename = changeFilename;
  vm.update = update;
  vm.activate = activate;

  activate();

  function activate() {
    typeService.getTypeById($state.params.id)
        .then(response => {
      vm.editData = {
        typename: response.data.name_type
      };
    });
  }

  function changeFilename() {
    if (vm.editData.file) {
      vm.filename = vm.editData.file.name;
    } else {
      vm.filename = 'Icon was not chosen';
    }
  }

  function update() {
    if (vm.editData.file) {
      Upload.rename(vm.editData.file, vm.editData.typename);
    }
    typeService
      .update($state.params.id, vm.editData, vm.editData.file)
      .then(() => {
        swal(
          'type was edited successfully',
          'Please, click ОК for continue',
          'success'
        );
        $state.go('types_all');
      })
      .catch(() => {
        swal(
          'type was not edited',
          'Please, check input data',
          'error'
        );
      });
  }
}
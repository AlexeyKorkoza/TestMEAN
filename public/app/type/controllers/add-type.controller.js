addTypeCtrl.$inject = ['$state', 'Upload', 'typeService'];

function addTypeCtrl($state, Upload, typeService) {

  const vm = this;
  vm.filename = 'Icon was not chosen';
  vm.getAllTypes = '';
  vm.changeFilename = changeFilename;
  vm.add = add;
  vm.activate = activate;

  activate();

  function activate () {
    vm.getAllTypes = typeService.getAll();
  }

  function changeFilename() {
    if (vm.addTypeData.file) {
      vm.filename = vm.addTypeData.file.name;
    } else {
      vm.filename = 'Icon was not chosen';
    }
  }

  function add() {
    Upload.rename(vm.addTypeData.file, vm.addTypeData.typename);
    let max = 0;
    if (vm.getAllTypes.length > 0) {
      max = vm.getAllTypes[0].id_type;
      vm.getAllTypes.forEach(item => {
        if (item.id_type > max) {
          max = item.id_type;
        }
      });
    }
    max += 1;
    vm.addTypeData.id = max;
    typeService.create(vm.addTypeData, vm.addTypeData.file)
      .then(response => {
        vm.addTypeData = response.data;
        swal(
          'type of object was added',
          'Please, click ОК for continue',
          'success'
        );
        $state.go('types_all');
    })
      .catch(() => {
        swal(
          'type of place was not added',
          'type of place has already existed',
          'error'
        );
      });
  }
}

export default addTypeCtrl;

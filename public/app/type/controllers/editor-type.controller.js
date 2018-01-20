editorTypeCtrl.$inject = ['$state', 'Upload', 'typeService'];

function editorTypeCtrl($state, Upload, typeService) {

    const vm = this;
    vm.types = [];
    vm.title = $state.params.id ? 'Edit' : 'Add';
    vm.filename = 'Icon was not chosen';
    vm.changeFilename = changeFilename;
    vm.save = save;
    vm.activate = activate;

    activate();

    function activate() {
        typeService.getAll()
            .then(response => {
                vm.types = response.data;
            });
        const id = $state.params.id;
        if (id) {
            typeService.getTypeById(id)
                .then(response => {
                    vm.editData = {
                        typename: response.data.name_type
                    };
                });
        }
    }

    function changeFilename() {
        if (vm.editData.file) {
            vm.filename = vm.editData.file.name;
        } else {
            vm.filename = 'Icon was not chosen';
        }
    }

    function save() {
        if (vm.editData.file) {
            Upload.rename(vm.editData.file, vm.editData.typename);
        }

        const id = $state.params.id;
        if (id) {
            typeService
                .update($state.params.id, vm.editData, vm.editData.file)
                .then(() => {
                    swal(
                        'type was edited successfully',
                        'Please, click ОК for continue',
                        'success'
                    );
                    $state.go('types');
                })
                .catch(() => {
                    swal(
                        'type was not edited',
                        'Please, check input data',
                        'error'
                    );
                });
        } else {
            let max = 0;
            if (vm.types.length > 0) {
                max = vm.types[0].id_type;
                vm.types.forEach(item => {
                    if (item.id_type > max) {
                        max = item.id_type;
                    }
                });
            }
            max += 1;
            vm.editData.id = max;
            typeService.create(vm.editData, vm.editData.file)
                .then(response => {
                    vm.editData = response.data;
                    swal(
                        'type of object was added',
                        'Please, click ОК for continue',
                        'success'
                    );
                    $state.go('types');
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

}

export default editorTypeCtrl;

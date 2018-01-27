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
                        name: response.data.name
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
            Upload.rename(vm.editData.file, vm.editData.name);
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
            console.log(vm.editData, vm.editData.file);
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

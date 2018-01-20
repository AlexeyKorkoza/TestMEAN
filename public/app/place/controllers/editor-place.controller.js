import config from '../../config/config';

editorPlaceCtrl.$inject = ['$state', 'typeService', 'placeService', 'types'];

function editorPlaceCtrl($state, typeService, placeService, types) {

    const vm = this;
    vm.select = [];
    vm.activate = activate;
    vm.title = $state.params.id ? 'Edit' : 'Add';
    vm.save = save;

    activate();

    function activate() {
        vm.myConfig = config.select;
        vm.select = types.data;
        typeService.getAll()
            .then(response => {
                response.data.forEach(item => {
                    vm.select.push({
                        value: item.id_type,
                        text: item.name_type
                    });
                })
            });

        const id = $state.params.id;
        if (id) {
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
    }

    function save() {
        vm.error = '';
        const id = $state.params.id;
        if (id) {
            placeService
                .update(vm.editData, $state.params.id)
                .then(result => {
                    swal(
                        `${result.data}`,
                        'Please, click OK for continue',
                        'success'
                    );
                    $state.go('places');
                })
                .catch(() => {
                    swal(
                        'place was not updated',
                        'Check input data',
                        'error'
                    );
                });
        } else {
            placeService.create(vm.editData)
                .then(() => {
                    swal(
                        'place was added',
                        'Please, click ОК for continue',
                        'success'
                    );
                    $state.go('places');
                })
                .catch(() => {
                    swal(
                        'place was not added',
                        'Check input data',
                        'error'
                    );
                });
        }
    }
}

export default editorPlaceCtrl;

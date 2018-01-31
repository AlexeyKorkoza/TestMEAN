import config from '../../config/config';

editorPlaceCtrl.$inject = ['$state', 'placeService', 'types'];

function editorPlaceCtrl($state, placeService, types) {
    const vm = this;
    vm.types = [];
    vm.activate = activate;
    vm.buildPlace = buildPlace;
    vm.title = $state.params.id ? 'Edit' : 'Add';
    vm.save = save;

    activate();

    function activate() {
        vm.myConfig = config.select;
        vm.types = types.data.map(item => ({
            value: item._id,
            text: item.name,
        }));

        const id = $state.params.id;
        if (id) {
            placeService.getPlaceById($state.params.id)
                .then(response => {
                    vm.editData = {
                        name: response.data.name,
                        description: response.data.description,
                        address: response.data.address,
                        _id: response.data._id,
                    };
                });
        }
    }

    function buildPlace() {
        const place = {
            name: vm.editData.name,
            description: vm.editData.description,
            _id: vm.editData._id,
        };
        if (vm.editData.address.geometry) {
            place.address = vm.editData.address.formatted_address;
            place.lat = vm.editData.address.geometry.location.lat();
            place.lng = vm.editData.address.geometry.location.lng();
        }
        return place;
    }

    function save() {
        vm.error = '';
        const id = $state.params.id;
        const place = buildPlace();

        if (id) {
            placeService
                .update(place, $state.params.id)
                .then(result => {
                    swal(
                        `${result.data}`,
                        'Please, click OK for continue',
                        'success',
                    );
                    $state.go('places');
                })
                .catch(() => {
                    swal(
                        'place was not updated',
                        'Check input data',
                        'error',
                    );
                });
        } else {
            placeService.create(place)
                .then(() => {
                    swal(
                        'place was added',
                        'Please, click ОК for continue',
                        'success',
                    );
                    $state.go('places');
                })
                .catch(() => {
                    swal(
                        'place was not added',
                        'Check input data',
                        'error',
                    );
                });
        }
    }
}

export default editorPlaceCtrl;

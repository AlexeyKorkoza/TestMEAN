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
            value: item.id_type,
            text: item.name_type
        }));

        const id = $state.params.id;
        if (id) {
            placeService.getPlaceById($state.params.id)
                .then(response => {
                    vm.editData = {
                        name_place: response.data.name_place,
                        description: response.data.description,
                        address: response.data.address,
                        id_type: response.data.id_type
                    };
                });
        }
    }

    function buildPlace() {
        const place = {
            name_place: vm.editData.name_place,
            description: vm.editData.description,
            id_type: vm.editData.id_type
        };
        if (vm.editData.address.geometry) {
            place.address =  vm.editData.address.formatted_address;
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
            placeService.create(place)
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

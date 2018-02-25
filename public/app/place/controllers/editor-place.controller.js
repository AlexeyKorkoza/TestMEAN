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
        const { id } = $state.params;
        if (id) {
            placeService.getPlaceById(id)
                .then(response => {
                    vm.editData = {
                        name: response.data.name,
                        description: response.data.description,
                        address: response.data.address,
                    };
                    const type = types.data.filter(item => item.places.length)
                                           .filter(item => item.places.filter(ele => ele === id));
                    vm.editData.type = [{
                        _id: type[0]._id,
                        text: type[0].name,
                    }];
                    console.log(vm.editData);
                });
        }
        vm.types = types.data.map(item => ({
            _id: item._id,
            text: item.name,
        }));
    }

    function buildPlace() {
        const place = {
            name: vm.editData.name,
            description: vm.editData.description,
            _id: vm.editData.type[0]._id,
        };
        if (vm.editData.address.geometry) {
            place.address = vm.editData.address.formatted_address;
            place.lat = vm.editData.address.geometry.location.lat();
            place.lng = vm.editData.address.geometry.location.lng();
        }
        return place;
    }

    function save() {
        const id = $state.params.id;
        const place = buildPlace();
        console.log('place', place, vm.editData);

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

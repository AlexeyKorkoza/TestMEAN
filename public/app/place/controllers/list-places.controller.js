listPlacesCtrl.$inject = ['placeService', 'places'];

function listPlacesCtrl(placeService, places) {
    const vm = this;
    vm.places = [];
    vm.activate = activate;
    vm.remove = remove;

    activate();

    function activate() {
        vm.places = places.data;
    }

    function remove(id, index) {
        placeService.remove(id)
            .then(() => {
                swal(
                    'place was removed',
                    'Please, click OK for continue',
                    'success',
                );
                vm.places.splice(index, 1);
            })
            .catch(() => {
                swal(
                    'place was not removed',
                    'Retry',
                    'error',
                );
            });
    }
}

export default listPlacesCtrl;

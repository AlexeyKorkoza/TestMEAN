import angular from 'angular';
import config from '../../config/config';

function mapCtrl(cfpLoadingBar, placeService, places, types) {
    const vm = this;
    vm.group_markers = [];
    vm.getAllPlaces = getAllPlaces;
    vm.getAllTypes = getAllTypes;
    vm.addPlaceInMap = addPlaceInMap;
    vm.getPlacesByType = getPlacesByType;
    vm.activate = activate;

    activate();

    function activate() {
        angular.extend(vm, {
            grodno: config.leaflet.center,
            markers: config.leaflet.markers,
            tiles: config.leaflet.titles,
        });

        vm.myConfig = config.select;
        cfpLoadingBar.start();
        vm.getAllTypes();
        vm.getAllPlaces();
        cfpLoadingBar.complete();
    }

    function getAllTypes() {
        vm.types = types.data.map(item => ({
            _id: item._id,
            text: item.name,
        }));
    }

    function getAllPlaces() {
        vm.addPlaceInMap(places.data);
    }

    function addPlaceInMap(places) {
        if (types.data) {
            types.data.forEach(type => {
                type.places.forEach((id, i) => {
                    const place = places.find(item => item._id === id);
                    const typeOfPlace = type.name;
                    const nameOfImage = type.image;
                    const lat = parseFloat(place.lat);
                    const lng = parseFloat(place.lng);
                    vm.markers[`marker${i + 1}`] = {
                        lat,
                        lng,
                        focus: false,
                        draggable: false,
                        group: 'vm.group_markers',
                        message: `<b>${
                            place.name
                        },</b> ${
                            typeOfPlace
                        }<br>${
                            place.address
                        }<br/>`,
                        icon: {
                            iconSize: [54, 54],
                            iconAnchor: [16, 37],
                            popupAnchor: [0, -30],
                            iconUrl: `./uploads/${nameOfImage}`,
                        },
                    };
                });
            });
            cfpLoadingBar.complete();
        }
    }

    function getPlacesByType(type) {
        cfpLoadingBar.start();
        if (!type.length) {
            vm.getAllPlaces();
        } else {
            vm.markers = {};
            console.log(type);
            const query = {
                types: [type]
            }
            placeService.getAll(query)
                .then(response => {
                    vm.places = response.data;
                    vm.addPlaceInMap(vm.places);
                });
        }
    }
}

mapCtrl.$inject = ['cfpLoadingBar', 'placeService', 'places', 'types'];

export default mapCtrl;

import angular from 'angular';
import config from '../../config/config';

mapCtrl.$inject = ['cfpLoadingBar', 'placeService', 'places', 'types'];

function mapCtrl(cfpLoadingBar, placeService, places, types) {

  const vm = this;
  vm.group_markers = [];
  vm.typess = [];
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
      tiles: config.leaflet.titles
    });

    vm.myConfig = config.select;
    cfpLoadingBar.start();
    vm.getAllTypes();
    vm.getAllPlaces();
    cfpLoadingBar.complete();
  }

  function getAllTypes() {
      vm.types = types.data.map(item => ({
          value: item.id_type,
          text: item.name_type
      }));
      vm.types.unshift({
          value: 0,
          text: 'All objects'
      });
  }

  function getAllPlaces() {
      vm.addPlaceInMap(places.data);
  }

  function addPlaceInMap(places) {
    console.log('Places', places);
    if (vm.types) {
     places.forEach((item, i) => {
        const typeOfPlace = vm.types[item.id_type - 1].name_type;
        const nameOfImage = vm.types[item.id_type - 1].image;
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lng);
        vm.markers['marker' + (i + 1)] = {
          lat: lat,
          lng: lng,
          focus: false,
          draggable: false,
          group: 'vm.group_markers',
          message: '<b>' +
          item.name_place +
          ',</b> ' +
          typeOfPlace +
          '<br>' +
          item.address +
          '<br/>',
          icon: {
            iconSize: [54, 54],
            iconAnchor: [16, 37],
            popupAnchor: [0, -30],
            iconUrl: './uploads/' + nameOfImage
          }
        };
      });
      cfpLoadingBar.complete();
    }
  }

  function getPlacesByType() {
    vm.typeIsNumber = parseInt(vm.type);
    cfpLoadingBar.start();
    if (vm.typeIsNumber === 0) {
      vm.getAllPlaces();
    } else {
      vm.markers = {};
      placeService.getPlacesByType(vm.typeIsNumber)
          .then(response => {
          vm.places = response.data;
          vm.addPlaceInMap(vm.places);
        }
      );
    }
  }
}

export default mapCtrl;

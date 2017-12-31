import angular from 'angular';
import L from 'leaflet';

import mapCtrl from './controllers/map.controller';
import routes from './map.routes';

export default angular.module('myApp.map', [])
    .controller('mapCtrl', mapCtrl)
    .config(routes)
    .name;

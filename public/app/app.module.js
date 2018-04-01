import '../vendor/bootstrap/dist/css/bootstrap.min.css';
import '../vendor/font-awesome/css/font-awesome.min.css';

import 'angular-responsive-tables/release/angular-responsive-tables.min.css';
import 'leaflet/dist/leaflet.css';
import 'angular-loading-bar/build/loading-bar.min.css';
import 'sweetalert/dist/sweetalert.css';
import 'angular-google-places-autocomplete/src/autocomplete.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import './styles/main.scss';

import angular from 'angular';
import 'angular-mocks';
import 'angular-ui-router';
import 'angular-loading-bar';
import 'angular-animate';
import 'angular-simple-logger/dist/angular-simple-logger.min';
import 'ng-file-upload';
import 'angular-responsive-tables';
import 'leaflet/dist/leaflet-src';
import 'ui-leaflet';
import 'angular-jwt';
import 'immutable';
import 'sweetalert';
import 'angular-google-places-autocomplete';
import 'leaflet.markercluster/dist/leaflet.markercluster-src';

import mapModule from './map/map.module';
import placesModule from './place/place.module';
import profileModule from './profile/profile.module';
import typesModule from './type/type.module';
import systemModule from './system/system.module';

const packageModules = [
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'ngFileUpload',
    'wt.responsive',
    'nemLogging',
    'ui-leaflet',
    'angular-jwt',
    'google.places',
    'ngMock',
];

function processAllModules(customModules) {
    angular.element(() => {
        angular.module('myApp', packageModules.concat(customModules));
        angular.bootstrap(document, ['myApp']);
    });
}

processAllModules([
    mapModule,
    placesModule,
    typesModule,
    profileModule,
    systemModule,
]);

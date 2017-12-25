/*import '../vendor/bootstrap/bootstrap.min.css';
import '../vendor/font-awesome/css/font-awesome.min.css';*/
// import './assets/css/fonts.css';
// import './assets/css/style.css';
// import './assets/css/sidebar.css';
// import './assets/css/angular-responsive-tables.min.css';

import 'angular';
import 'angular-ui-router';
import 'angular-loading-bar';
import 'angular-animate';
import 'angular-selectize2/dist/selectize.js';
import 'angular-simple-logger/dist/angular-simple-logger.min';
import 'ng-file-upload';
import 'angular-responsive-tables';
import 'ui-leaflet';
import 'angular-jwt';
import 'immutable';

import mapModule from './map/map.module';
import placesModule from './place/place.module';
import profileModule from './profile/profile.module';
import typesModule from './type/type.module';
import systemModule from './system/system.module';

const packageModules = [
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'selectize',
    'ngFileUpload',
    'wt.responsive',
    'nemLogging',
    'ui-leaflet',
    'angular-jwt'
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
    systemModule
]);

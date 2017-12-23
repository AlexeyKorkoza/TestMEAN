import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularLoadingBar from 'angular-loading-bar';
import ngAnimate from 'angular-animate';
import selectize from 'selectize';
import ngFileUpload from 'ng-file-upload';
import wtResponsive from 'angular-responsive-tables';
import uiLeaflet from 'ui-leaflet';
import angularJwt from 'angular-jwt';

import mapModule from './map/map.module';
import placesModule from './place/place.module';
import profileModule from './profile/profile.module';
import typesModule from './type/type.module';
import systemModule from './system/system.module';

import config from './app.config';

angular
    .module('myApp', [
        uiRouter,
        angularLoadingBar,
        ngAnimate,
        selectize,
        ngFileUpload,
        wtResponsive,
        uiLeaflet,
        angularJwt,
        mapModule,
        placesModule,
        profileModule,
        typesModule,
        systemModule
    ])
    .config(config);

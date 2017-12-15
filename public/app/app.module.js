'use strict';

angular
    .module('myApp', [
        'ui.router',
        'selectize',
        'angular-loading-bar',
        'ngAnimate',
        'ngFileUpload',
        'wt.responsive',
        'ui-leaflet',
        'angular-jwt'
    ])
    .config(config);

config.$inject = ['cfpLoadingBarProvider', '$httpProvider', 'jwtOptionsProvider'];

function config(cfpLoadingBarProvider, $httpProvider, jwtOptionsProvider) {
    cfpLoadingBarProvider.latencyThreshold = 1000;
    jwtOptionsProvider.config({
        tokenGetter: () => `Bearer ${window.token}`
    });

    $httpProvider.interceptors.push('jwtInterceptor');
}

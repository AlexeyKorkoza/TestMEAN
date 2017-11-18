'use strict';

angular
    .module('myApp', [
        'ui.router',
        'selectize',
        'angular-loading-bar',
        'ngAnimate',
        'ngFileUpload',
        'wt.responsive',
        'ui-leaflet'
    ])
    .config(config);

config.$inject = ['cfpLoadingBarProvider'];

function config(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 1000;
}

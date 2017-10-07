'use strict';

angular
    .module('myApp', [
        'ngRoute',
        'selectize',
        'angular-loading-bar',
        'ngAnimate',
        'ngFileUpload',
        'wt.responsive',
        'ui-leaflet'
    ])
    .config(config)
    .run(run);

config.$inject = ['cfpLoadingBarProvider'];
run.$inject = ['$http', 'userService'];

function config(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 1000;
}

function run($http, userService) {
  
    if(localStorage.getItem('username')){
        userService.getUser().then(function(response){
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('token', response.data.user.token);
        });
    }
}

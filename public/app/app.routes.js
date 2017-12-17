'use strict';

angular.module('myApp')
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('map', {
            url: '/',
            templateUrl: '/public/app/map/map.html',
            controller: 'mapCtrl',
        })
        .state('profile', {
            url: '/profile/{id}',
            templateUrl: '/public/app/profile/profile.html',
            controller: 'userProfileCtrl',
            controllerAs: 'vm'
        })
        .state('types_all', {
            url: '/types',
            templateUrl: '/public/app/type/view-types.html',
            controller: 'viewTypesCtrl',
            controllerAs: 'vm'
        })
        .state('types_new', {
            url: '/types/add',
            templateUrl: '/public/app/type/add-type.html',
            controller: 'addTypeCtrl',
            controllerAs: 'vm'
        })
        .state('types_one', {
            url: '/types/:id',
            templateUrl: '/public/app/type/edit-type.html',
            controller: 'editTypeCtrl',
            controllerAs: 'vm'
        })
        .state('places_all', {
            url: '/places',
            templateUrl: '/public/app/place/view-places.html',
            controller: 'viewPlacesCtrl',
            controllerAs: 'vm'
        })
        .state('places_new', {
            url: '/places/add',
            templateUrl: '/public/app/place/add-place.html',
            controller: 'addPlaceCtrl',
            controllerAs: 'vm'
        })
        .state('places_one', {
            url: '/places/:id',
            templateUrl: '/public/app/place/edit-place.html',
            controller: 'editPlaceCtrl',
            controllerAs: 'vm'
        })
}

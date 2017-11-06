'use strict';

angular.module('myApp')
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'app/Main/main.html'
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'app/SignIn/sign-in.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/SignUp/sign-up.html'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'app/Profile/profile.html'
        })
        .state('types_all', {
            url: '/types',
            templateUrl: 'app/Type/view-types.html'
        })
        .state('types_new', {
            url: '/types/add',
            templateUrl: 'app/Type/add-type.html'
        })
        .state('types_one', {
            url: '/types/:id',
            templateUrl: 'app/Type/edit-type.html'
        })
        .state('places_all', {
            url: '/places',
            templateUrl: 'app/Place/view-places.html'
        })
        .state('places_new', {
            url: '/places/add',
            templateUrl: 'app/Place/add-place.html'
        })
        .state('places_one', {
            url: '/places/:id',
            templateUrl: 'app/Place/edit-place.html'
        })
}

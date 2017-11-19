'use strict';

angular.module('myApp')
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/signin');

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'mainCtrl',
            controllerAs: 'vm',
            resolve: {
                userData: function(userService) {
                    return userService.getUser();
                }
            }
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'app/signIn/sign-in.html',
            controller: 'signInCtrl',
            controllerAs: 'vm'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/signUp/sign-up.html',
            controller: 'signUpCtrl',
            controllerAs: 'vm'
        })
        .state('profile', {
            url: '/profile/{id}',
            templateUrl: 'app/profile/profile.html',
            controller: 'userProfileCtrl',
            controllerAs: 'vm'
        })
        .state('types_all', {
            url: '/types',
            templateUrl: 'app/type/view-types.html',
            controller: 'viewTypesCtrl',
            controllerAs: 'vm'
        })
        .state('types_new', {
            url: '/types/add',
            templateUrl: 'app/type/add-type.html',
            controller: 'addTypeCtrl',
            controllerAs: 'vm'
        })
        .state('types_one', {
            url: '/types/:id',
            templateUrl: 'app/type/edit-type.html',
            controller: 'editTypeCtrl',
            controllerAs: 'vm'
        })
        .state('places_all', {
            url: '/places',
            templateUrl: 'app/place/view-places.html',
            controller: 'viewPlacesCtrl',
            controllerAs: 'vm'
        })
        .state('places_new', {
            url: '/places/add',
            templateUrl: 'app/place/add-place.html',
            controller: 'addPlaceCtrl',
            controllerAs: 'vm'
        })
        .state('places_one', {
            url: '/places/:id',
            templateUrl: 'app/place/edit-place.html',
            controller: 'editPlaceCtrl',
            controllerAs: 'vm'
        })
}

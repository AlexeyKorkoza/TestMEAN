'use strict';

angular.module('myApp')
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/signin');

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'app/Main/main.html',
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
            templateUrl: 'app/SignIn/sign-in.html',
            controller: 'signInCtrl',
            controllerAs: 'vm'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/SignUp/sign-up.html',
            controller: 'signUpCtrl',
            controllerAs: 'vm'
        })
        .state('profile', {
            url: '/profile/{id}',
            templateUrl: 'app/Profile/profile.html',
            controller: 'userProfileCtrl',
            controllerAs: 'vm'
        })
        .state('types_all', {
            url: '/types',
            templateUrl: 'app/Type/view-types.html',
            controller: 'viewTypesCtrl',
            controllerAs: 'vm'
        })
        .state('types_new', {
            url: '/types/add',
            templateUrl: 'app/Type/add-type.html',
            controller: 'addTypeCtrl',
            controllerAs: 'vm'
        })
        .state('types_one', {
            url: '/types/:id',
            templateUrl: 'app/Type/edit-type.html',
            controller: 'editTypeCtrl',
            controllerAs: 'vm'
        })
        .state('places_all', {
            url: '/places',
            templateUrl: 'app/Place/view-places.html',
            controller: 'viewPlacesCtrl',
            controllerAs: 'vm'
        })
        .state('places_new', {
            url: '/places/add',
            templateUrl: 'app/Place/add-place.html',
            controller: 'addPlaceCtrl',
            controllerAs: 'vm'
        })
        .state('places_one', {
            url: '/places/:id',
            templateUrl: 'app/Place/edit-place.html',
            controller: 'editPlaceCtrl',
            controllerAs: 'vm'
        })
}

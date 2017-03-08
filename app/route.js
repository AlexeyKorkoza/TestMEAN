'use strict';

angular
  .module('myApp')
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'Main/main.html'
      })
      .when('/signin', {
        templateUrl: 'SignIn/signIn.html'
      })
      .when('/signup', {
        templateUrl: 'SignUp/signUp.html'
      })
      .when('/users/:id', {
        templateUrl: 'UserProfile/userProfile.html'
      })
      .when('/types', {
        templateUrl: 'TypeOfPlace/ViewTypes.html'
      })
      .when('/types/add',{
        templateUrl: 'TypeOfPlace/AddType.html'
      })
      .when('/types/:id',{
        templateUrl: 'TypeOfPlace/EditType.html'
      })
      .when('/places', {
        templateUrl: 'Place/ViewPlaces.html'
      })
      .when('/places/add', {
        templateUrl: 'Place/addPlace.html'
      })
      .when('/places/:id',{
        templateUrl: 'Place/EditPlace.html'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  });
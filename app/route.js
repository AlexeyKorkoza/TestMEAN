"use strict";

angular.module("myApp").config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "app/Main/main.html"
    })
    .when("/signin", {
      templateUrl: "app/SignIn/signIn.html"
    })
    .when("/signup", {
      templateUrl: "app/SignUp/signUp.html"
    })
    .when("/users/:id", {
      templateUrl: "app/UserProfile/userProfile.html"
    })
    .when("/types", {
      templateUrl: "app/TypeOfPlace/ViewTypes.html"
    })
    .when("/types/add", {
      templateUrl: "app/TypeOfPlace/AddType.html"
    })
    .when("/types/:id", {
      templateUrl: "app/TypeOfPlace/EditType.html"
    })
    .when("/places", {
      templateUrl: "app/Place/ViewPlaces.html"
    })
    .when("/places/add", {
      templateUrl: "app/Place/addPlace.html"
    })
    .when("/places/:id", {
      templateUrl: "app/Place/EditPlace.html"
    })
    .otherwise({ redirectTo: "/" });
});

"use strict";

angular.module("myApp").config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "app/Main/main.html"
    })
    .when("/signin", {
      templateUrl: "app/SignIn/sign-in.html"
    })
    .when("/signup", {
      templateUrl: "app/SignUp/sign-up.html"
    })
    .when("/users/:id", {
      templateUrl: "app/UserProfile/user-profile.html"
    })
    .when("/types", {
      templateUrl: "app/TypeOfPlace/view-types.html"
    })
    .when("/types/add", {
      templateUrl: "app/TypeOfPlace/add-type.html"
    })
    .when("/types/:id", {
      templateUrl: "app/TypeOfPlace/edit-type.html"
    })
    .when("/places", {
      templateUrl: "app/Place/view-places.html"
    })
    .when("/places/add", {
      templateUrl: "app/Place/add-place.html"
    })
    .when("/places/:id", {
      templateUrl: "app/Place/edit-place.html"
    })
    .otherwise({ redirectTo: "/" });
});

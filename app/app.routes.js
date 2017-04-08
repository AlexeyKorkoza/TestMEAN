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
      templateUrl: "app/User/user-profile.html"
    })
    .when("/types", {
      templateUrl: "app/Type/view-types.html"
    })
    .when("/types/add", {
      templateUrl: "app/Type/add-type.html"
    })
    .when("/types/:id", {
      templateUrl: "app/Type/edit-type.html"
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

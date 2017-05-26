"use strict";

angular
    .module("myApp")
    .factory("authenticationService", authenticationService);

authenticationService.inject = ["$http"];
function authenticationService($http) {
  var service = {
    login: login,
    logout: logout
  };

  return service;

  function login(data) {
    return $http.post("/auth/login", data);
  }

  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    $location.path("/signin");
  }
}

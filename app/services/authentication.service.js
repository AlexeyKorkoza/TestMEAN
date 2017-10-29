"use strict";

angular
    .module("myApp")
    .factory("authenticationService", authenticationService);

authenticationService.inject = ["$http", '$location'];
function authenticationService ($http, $location) {
  const service = {
    login: login,
    logout: logout
  };

  return service;

  function login(data) {
    return $http.post("/api/v1/auth/login", data);
  }

  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    $location.path("/api/v1/signin");
  }
}

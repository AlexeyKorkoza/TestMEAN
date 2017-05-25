"use strict";

angular
  .module("myApp")
  .factory("mainService", mainService);

mainService.$inject = ['$http', '$location'];

function mainService($http, $location) {

  var service = {
    getAllPlaces: getAllPlaces,
    getAllTypes: getAllTypes,
    getByType: getByType,
    logout: logout
  };

  return service;

  function getAllPlaces() {
    return $http.post("", {allPlaces: "allPlaces"});
  }

  function getAllTypes() {
    return $http.post("", {allTypes: "allTypes"});
  }

  function getByType(type) {
    return $http.post("", {type: type});
  }

  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    $location.path("/signin");
  }

}
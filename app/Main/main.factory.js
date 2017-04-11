angular
  .module("myApp")
  .factory("mainService", mainService);

mainService.$inject = ['$http', '$localStorage', '$location'];

function mainService($http, $localStorage, $location) {

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
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = "";
    $location.path("/signin");
  }

}
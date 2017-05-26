angular
  .module("myApp")
  .factory("signInService", signInService);

signInService.$inject = ['$http'];

function signInService($http) {

  var service = {
    login: login
  };

  return service;

  function login(data) {
    return $http.post("/auth/login", data);
  }

}
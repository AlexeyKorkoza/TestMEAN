angular
  .module("myApp")
  .factory("signUpService", signUpService);

signUpService.$inject = ['$http'];

function signUpService($http) {

  var service = {
    signup: signup
  };

  return service;

  function signup(data) {
    return $http.post("/auth/signup", data);
  }

}
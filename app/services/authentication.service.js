'use strict';

angular
    .module('myApp')
    .factory('authenticationService', authenticationService);

authenticationService.inject = ['$http', '$state'];
function authenticationService ($http, $state) {
  const service = {
    login,
    logout
  };

  return service;

  function login(data) {
    return $http.post('/api/v1/auth/login', data);
  }

  function logout() {
    localStorage.removeItem('token');
    $state.go('signin');
  }
}

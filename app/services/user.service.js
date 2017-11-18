angular
  .module('myApp')
  .factory('userService', userService);

userService.$inject = ['$http'];

function userService($http) {

  const service = {
    getUser
  };

  return service;

  function getUser() {
    const headers = {};
    headers.authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null;
    return $http.get('/api/v1/user', { headers: headers });
  }
}
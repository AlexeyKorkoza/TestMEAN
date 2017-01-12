angular
  .module('myApp')
  .factory('SignInService', function ($http) {
    return {
      getAllUsers: function () {
        return $http.post('/signin');
      }
    }
  });
angular
  .module('myApp')
  .factory('SignUpService', function ($http) {
    return {
      getAllUsers: function () {
        return $http.post('/signup');
      }
    }
  });
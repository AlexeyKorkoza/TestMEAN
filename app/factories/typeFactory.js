angular
  .module('myApp')
  .factory('typeService', function ($http) {
    return {
      getAllTypes: function () {
        return $http.get('/types');
      }
    }
  });
angular
  .module('myApp')
  .factory('TypeService', function($http) {
  return {
    getAllTypes: function(id) {
      return $http.get('/api/v1/movies/' + id);
    },

    getByType: function () {
      
    }
  }
});
angular
  .module('myApp')
  .factory('MainService', function ($http) {
    return {
      getAllTypes: function () {
        return $http.post('', {'allTypes': 'allTypes'});
      },

      getByType: function (type) {
        return $http.post('', {'type': parseInt(type)});
      },

      getAllPlaces: function () {
        return $http.post('', {'allPlaces': 'allPlaces'});
      }
    }
  });
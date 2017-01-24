angular
  .module('myApp')
  .factory('placeService', function ($http) {
    return {
      getAllPlaces: function () {
        return $http.get('', {'allPlaces': 'allPlaces'});
      }
    }
  });
angular
  .module('myApp')
  .factory('PlaceService', function ($http) {
    return {
      getAllPlaces: function () {
        return $http.post('', {'allPlaces': 'allPlaces'});
      }
    }
  });
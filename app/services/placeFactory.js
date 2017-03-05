angular
  .module('myApp')
  .factory('placeService', function ($http) {

    var Places = "";

    function setPlaces(places) {
      Places = places;
    }

    function getPlaces() {
      return Places;
    }

    return {

      setPlaces: setPlaces,
      getPlaces: getPlaces,

      getAllPlaces: function () {
        return $http.get('/places');
      },

      create: function (data) {
        return $http.post('/places/add', data);
      },

      delete: function (id) {
        return $http.delete('/places/' + id, {params: {'id': id}});
      },

      update: function (data, id) {
        return $http.put('/places/' + id, data);
      },

      getPlaceById: function (id) {
        return $http.get('/places/' + id);
      }
    }
  });
angular
  .module('myApp')
  .factory('placeService', function ($http) {

    var Places = "";
    var Id = "";

    function setPlaces(places) {
      Places = places;
    }

    function getPlaces() {
      return Places;
    }

    function setId(id) {
      Id = id;
    }

    function getId() {
      return Id
    }

    return {

      setPlaces: setPlaces,
      getPlaces: getPlaces,
      setId: setId,
      getId: getId,

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
        return $http.put('/places/edit/' + id, data);
      }
    }
  });
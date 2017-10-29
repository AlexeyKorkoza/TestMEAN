'use strict';

angular
  .module("myApp")
  .factory("placeService",placeService);

  placeService.$inject = ['$http'];

  function placeService($http){

    const service = {
      getAllPlaces: getAllPlaces,
      create: create,
      remove: remove,
      update: update,
      getPlaceById: getPlaceById,
      getPlacesByType: getPlacesByType,
      setPlaces: setPlaces,
      getPlaces: getPlaces
    };

    return service;

    function getAllPlaces () {
      return $http.get("/api/v1/places");
    }

    function create(data) {
      return $http.post("/api/v1/places/add", data);
    }

    function remove(id) {
      return $http.delete("/api/v1/places/" + id, { params: { id: id } });
    }

    function update(data, id) {
      return $http.put("/api/v1/places/" + id, data);
    }

    function getPlaceById(id) {
      return $http.get("/api/v1/places/" + id);
    }

    function getPlacesByType(id){
      return $http.get("/api/v1/places/type/" + id);
    }

    let Places = "";

    function setPlaces(places) {
      Places = places;
    }

    function getPlaces() {
      return Places;
    }
}
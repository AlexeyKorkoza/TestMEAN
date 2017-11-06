"use strict";

angular
  .module("myApp")
  .factory("typeService", typeService);

typeService.$inject = ['$http', 'Upload'];

function typeService($http, Upload) {

  const service = {
    getAll,
    create,
    update,
    remove,
    getTypeById
  };

  return service;

  function getAll() {
    return $http.get("/api/v1/types");
  }

  function create(data, file) {
    return Upload.upload({
      url: "/api/v1/types/add",
      data: {
        file: file,
        data: data
      }
    });
  }

  function update(id, data, file) {
    return Upload.upload({
      url: "/api/v1/types/" + id,
      method: "PUT",
      data: {
        file: file,
        data: data
      }
    });
  }

  function remove(id) {
    return $http.delete("/api/v1/types/" + id, {params: {id: id}});
  }

  function getTypeById(id) {
    return $http.get("/api/v1/types/" + id);
  }

}
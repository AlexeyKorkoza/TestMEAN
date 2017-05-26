"use strict";

angular
  .module("myApp")
  .factory("typeService", typeService);

typeService.$inject = ['$http', 'Upload'];

function typeService($http, Upload) {

  var service = {
    setTypes: setTypes,
    getTypes: getTypes,
    getAllTypes: getAllTypes,
    create: create,
    update: update,
    remove: remove,
    getTypeById: getTypeById
  };

  return service;

  var Types = "";

  function setTypes(types) {
    Types = types;
  }

  function getTypes() {
    return Types;
  }

  function getAllTypes() {
    return $http.get("/types");
  }

  function create(data, file) {
    return Upload.upload({
      url: "/types/add",
      data: {
        file: file,
        data: data
      }
    });
  }

  function update(id, data, file) {
    return Upload.upload({
      url: "/types/" + id,
      method: "PUT",
      data: {
        file: file,
        data: data
      }
    });
  }

  function remove(id) {
    return $http.delete("/types/" + id, {params: {id: id}});
  }

  function getTypeById(id) {
    return $http.get("/types/" + id);
  }

}
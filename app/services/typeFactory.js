angular
  .module('myApp')
  .factory('typeService', function ($http, Upload) {

    var Types = "";
    var Id = "";

    function setTypes(types) {
      Types = types;
    }

    function getTypes() {
      return Types;
    }

    function setId(id) {
      Id = id;
    }

    function getId() {
      return Id
    }

    return {

      setTypes: setTypes,
      getTypes: getTypes,
      setId: setId,
      getId: getId,

      getAllTypes: function () {
        return $http.get('/types');
      },

      create: function (data, file) {
        return Upload.upload({
          url: '/types/add',
          data: {
            file: file, data: data
          }
        });
      },

      update: function (data, file) {
        return Upload.upload({
          url: '/types/' + data.id,
          method: 'PUT',
          data: {
            file: file, data: data
          }
        });
      },

      delete: function (id) {
        return $http.delete('/types/' + id, {params: {'id': id}});
      }

    }
  });
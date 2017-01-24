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

      create: function (data, id, file) {
        return Upload.upload({
          url: '/types',
          method: 'POST',
          data: {
            typename: data.typename, id_type: id, file: file
          }
        });
      },

      update: function (data, id, file) {
        return Upload.upload({
          url: '/types/edit/' + id,
          method: 'PUT',
          data: {
            typename: data.typename, id_type: id, file: file
          }
        });
      },

      delete: function (id) {
        return $http.delete('/types/' + id, {params: {'id': id}});
      }

    }
  });
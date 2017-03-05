angular
  .module('myApp')
  .factory('typeService', function ($http, Upload) {

    var Types = "";

    function setTypes(types) {
      Types = types;
    }

    function getTypes() {
      return Types;
    }

    return {

      setTypes: setTypes,
      getTypes: getTypes,

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
      },

      getTypeById: function (id) {
        return $http.get('/types/' + id);
      }

    }
  });
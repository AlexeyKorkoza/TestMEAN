angular
  .module('myApp')
  .factory('typeService', function ($http, Upload) {
    return {
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
          url: '/types',
          method: 'PUT',
          data: {
            typename: data.typename, id_type: id, file: file
          }
        });
      }
    }
  });
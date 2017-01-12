angular
  .module('myApp')
  .factory('TypeService', function ($http) {
    return {
      getAllTypes: function () {
        return $http.post('', {'allTypes': 'allTypes'});
      },

      getByType: function (type) {
        return $http.post('', {'type': parseInt(type)});
      }
    }
  });
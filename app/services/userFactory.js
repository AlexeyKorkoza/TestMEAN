angular
  .module('myApp')
  .factory('userService', function ($http) {

    return {

      getUserInfo: function (username) {
        return $http({
          url: '/users/' + username,
          method: 'get'
        })
      },

      updateUserInfo: function (username, data) {
        return $http.put('/users/' + username, data);
      }
    }
  });
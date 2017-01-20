angular
  .module('myApp')
  .factory('userService', function ($http) {
    var UserId = "";

    function setUserId(id) {
      UserId = id;
    }

    function getUserId() {
      return UserId;
    }

    return {
      getUserId: getUserId,
      setUserId: setUserId,

      getUserInfo: function (id) {
        return $http({
          url: '/users/' + id,
          method: 'get',
          params: {"id": id}
        })
      },

      updateUserInfo: function (id, data) {
        return $http.put('/users/' + id, data);
      }
    }
  });
angular
  .module('myApp')
  .factory('userService', function ($http) {
    var UserName = "";

    function setUserName(username) {
      UserName = username;
    }

    function getUserName() {
      return UserName;
    }

    return {
      getUserName: getUserName,
      setUserName: setUserName,

      getUserInfo: function (username) {
        return $http({
          url: '/users/' + username,
          method: 'get',
          params: {"username": username}
        })
      },

      updateUserInfo: function (username, data) {
        return $http.put('/users/' + username, data);
      }
    }
  });
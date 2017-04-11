angular
  .module("myApp")
  .factory("userService", userService);

userService.$inject = ['$http'];

function userService($http) {

  var service = {
    getUserInfo: getUserInfo,
    updateUserInfo: updateUserInfo
  };

  return service;

  function getUserInfo(id) {
    return $http({
      url: "/users/" + id,
      method: "get"
    });
  }

  function updateUserInfo(username, data) {
    return $http.put("/users/" + username, data);
  }

}
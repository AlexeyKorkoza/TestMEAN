angular
  .module("myApp")
  .factory("userService", userService);

userService.$inject = ['$http'];

function userService($http) {

  const service = {
    getUser: getUser,
    getUserInfo: getUserInfo,
    updateUserInfo: updateUserInfo
  };

  return service;

  function getUser() {
    const headers = {
      "authorization": "Token " + localStorage.getItem("token")
    };
    return $http.get('/user', { headers: headers });
  }

  function getUserInfo(username) {
    return $http.get("/user/edit/" + username);
  }

  function updateUserInfo(username, data) {
    return $http.put("/user/edit/" + username, data);
  }

}
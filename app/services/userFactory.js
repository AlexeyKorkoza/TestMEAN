angular.module("myApp").factory("userService", function($http) {
  return {
    getUserInfo: function(id) {
      return $http({
        url: "/users/" + id,
        method: "get"
      });
    },

    updateUserInfo: function(username, data) {
      return $http.put("/users/" + username, data);
    }
  };
});
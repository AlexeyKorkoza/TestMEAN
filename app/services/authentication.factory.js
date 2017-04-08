angular
  .module("myApp")
  .factory("authenticationService", function($http, $localStorage, $location) {
    return {
      login: function(data) {
        return $http.post("/auth/login", data);
      },

      signup: function(data) {
        return $http.post("/auth/signup", data);
      },

      logout: function() {
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = "";
        $location.path("/signin");
      }
    };
  });
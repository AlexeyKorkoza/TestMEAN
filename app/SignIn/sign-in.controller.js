"use strict";

angular
  .module("myApp")
  .controller("signInCtrl", signInCtrl);

signInCtrl.$inject = ['$http', '$location', '$localStorage', 'signInService', 'cfpLoadingBar'];

function signInCtrl($http, $location, $localStorage, signInService, cfpLoadingBar) {

  var vm = this;
  vm.back = back;
  vm.LoginBtnClick = LoginBtnClick;

  function back() {
    $location.path("/");
  };

  function LoginBtnClick() {
    vm.error = "";
    signInService
      .login(vm.formData)
      .then(function (response) {
        cfpLoadingBar.start();
        if (response.data.state == "success") {
          $localStorage.currentUser = {
            id: response.data.user.id,
            username: vm.formData.username,
            token: response.token
          };
          $http.defaults.headers.common.Authorization = "Bearer " +
            response.token;
          $location.path("/");
        }
        if (response.data.state == "failure") {
          vm.error = response.data.message;
        }
      })
      .catch(function (response) {
        console.log(response);
      })
      .finally(function () {
        cfpLoadingBar.complete();
      });
  }
}
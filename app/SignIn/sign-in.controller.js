"use strict";

angular
  .module("myApp")
  .controller("signInCtrl", signInCtrl);

signInCtrl.$inject = ['$http', '$location', 'authenticationService', 'cfpLoadingBar'];

function signInCtrl($http, $location, authenticationService, cfpLoadingBar) {

  var vm = this;
  vm.back = back;
  vm.LoginBtnClick = LoginBtnClick;

  function back() {
    $location.path("/");
  };

  function LoginBtnClick() {
    vm.error = "";
    authenticationService
      .login(vm.formData)
      .then(function (response) {
        cfpLoadingBar.start();
        if (response.data.state == "success") {
          localStorage.setItem("username", vm.formData.username);
          localStorage.setItem("token", response.data.user.token);
          $location.path("/");
        }
        if (response.data.state == "failure") {
          vm.error = response.data.message;
        }
      })
      .finally(function () {
        cfpLoadingBar.complete();
      });
  }
}
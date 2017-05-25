"use strict";

angular
  .module("myApp")
  .controller("signInCtrl", signInCtrl);

signInCtrl.$inject = ['$http', '$location', 'signInService', 'cfpLoadingBar'];

function signInCtrl($http, $location, signInService, cfpLoadingBar) {

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
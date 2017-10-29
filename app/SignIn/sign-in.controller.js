"use strict";

angular
  .module("myApp")
  .controller("signInCtrl", signInCtrl);

signInCtrl.$inject = ['$location', 'authenticationService', 'cfpLoadingBar'];

function signInCtrl($location, authenticationService, cfpLoadingBar) {

  const vm = this;
  vm.error = '';
  vm.back = back;
  vm.LoginBtnClick = LoginBtnClick;

  function back() {
    $location.path("/");
  }

  function LoginBtnClick() {
    vm.error = '';
    cfpLoadingBar.start();
    authenticationService
      .login(vm.formData)
      .then(response => {
        cfpLoadingBar.complete();
        localStorage.setItem("username", vm.formData.username);
        localStorage.setItem("token", response.data.user.token);
        $location.path("/");
      })
      .catch(err => {
        vm.error = err.data.message;
        cfpLoadingBar.complete();
      });
  }
}
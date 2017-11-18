'use strict';

angular
  .module('myApp')
  .controller('signInCtrl', signInCtrl);

signInCtrl.$inject = ['$state', 'authenticationService', 'cfpLoadingBar'];

function signInCtrl($state, authenticationService, cfpLoadingBar) {

  const vm = this;
  vm.error = '';
  vm.LoginBtnClick = LoginBtnClick;

  function LoginBtnClick() {
    vm.error = '';
    cfpLoadingBar.start();
    authenticationService
      .login(vm.formData)
      .then(response => {
        cfpLoadingBar.complete();
        localStorage.setItem('token', response.data.user.token);
        $state.go('main');
      })
      .catch(err => {
        vm.error = err.data.message;
        cfpLoadingBar.complete();
      });
  }
}
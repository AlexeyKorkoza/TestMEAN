'use strict';

angular
  .module('myApp')
  .controller('signUpCtrl', signUpCtrl);

signUpCtrl.$inject = ['$state', 'cfpLoadingBar', 'signUpService'];

function signUpCtrl($state, cfpLoadingBar, signUpService) {

  const vm = this;
  vm.error = "";
  vm.RegBtnClick = RegBtnClick;

  function RegBtnClick() {
    cfpLoadingBar.start();
    signUpService.signup(vm.formData)
      .then(() => {
        cfpLoadingBar.complete();
        $state.go('main');
      })
      .catch(err => {
        vm.error = err.data.message;
        cfpLoadingBar.complete();
      });
  }
}
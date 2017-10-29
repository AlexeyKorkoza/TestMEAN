'use strict';

angular
  .module('myApp')
  .controller('signUpCtrl', signUpCtrl);

signUpCtrl.$inject = ['$location', 'cfpLoadingBar', 'signUpService'];

function signUpCtrl($location, cfpLoadingBar, signUpService) {

  const vm = this;
  vm.error = "";
  vm.back = back;
  vm.RegBtnClick = RegBtnClick;

  function back() {
    $location.path('/');
  }

  function RegBtnClick() {
    cfpLoadingBar.start();
    signUpService.signup(vm.formData)
      .then(() => {
        cfpLoadingBar.complete();
        $location.path('/');
      })
      .catch(err => {
        vm.error = err.data.message;
        cfpLoadingBar.complete();
      });
  }
}
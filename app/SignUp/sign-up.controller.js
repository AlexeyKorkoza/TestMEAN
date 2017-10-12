'use strict';

angular
  .module('myApp')
  .controller('signUpCtrl', signUpCtrl);

signUpCtrl.$inject = ['$location', 'cfpLoadingBar', 'signUpService'];

function signUpCtrl($location, cfpLoadingBar, signUpService) {

  var vm = this;
  vm.error = "";
  vm.back = back;
  vm.RegBtnClick = RegBtnClick;

  function back() {
    $location.path('/');
  }

  function RegBtnClick() {
    signUpService.signup(vm.formData)
      .then(function (response) {
        cfpLoadingBar.start();
        if (response.data.state == 'success') {
          $location.path('/');
        }
        if (response.data.state == 'failure') {
          vm.error = response.data.message;
        }
      })
      .finally(function () {
        cfpLoadingBar.complete();
      });
  }
}
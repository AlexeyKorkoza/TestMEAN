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
    vm.formData.date = "";
    var date = new Date();
    if (date.getDay() < 10) {
      vm.formData.date = "0" + date.getDay() + ".";
    } else {
      vm.formData.date = date.getDay() + ".";
    }
    if (date.getMonth() + 1 < 10) {
      vm.formData.date += "0" + (date.getMonth() + 1) + "." + date.getFullYear();
    } else {
      vm.formData.date += date.getMonth() + 1 + "." + date.getFullYear();
    }
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
"use strict";

angular
  .module("myApp")
  .controller("userProfileCtrl", userProfileCtrl);

userProfileCtrl.$inject = ['$routeParams', 'userService'];

function userProfileCtrl($routeParams, userService) {

  var vm = this;
  vm.activate = activate;
  vm.update = update;
  vm.updatePassword = updatePassword;

  activate();

  function activate() {
    userService.getUserInfo(localStorage.getItem("username")).then(function (response) {
      vm.userData = response.data;
    });
  }

  function update() {
    userService
      .updateUserInfo(localStorage.getItem("username"), vm.userData)
      .then(function (response) {
        if (response.data.code) {
          swal("Информация не обновлена", "Повторите попытку", "error");
        } else {
          localStorage.setItem("username", response.data.username);
          swal(
            "Информация успешно обновлена",
            "После выхода данные будут успешные применены",
            "success"
          );
        }
      });
  };

  function updatePassword() {
    var data = {
      username: vm.userData.username,
      email: vm.userData.email,
      password: vm.settingPassword.password,
      date: vm.userData.date
    };
    userService.updateUserInfo(localStorage.getItem("username"), data).then(function (response) {
      localStorage.setItem("username", response.data.username);
      swal(
        "Информация успешно обновлена",
        "После выхода данные будут успешные применены",
        "success"
      );
    });
  };
}
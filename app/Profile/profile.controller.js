"use strict";

angular
  .module("myApp")
  .controller("userProfileCtrl", userProfileCtrl);

userProfileCtrl.$inject = ['userService'];

function userProfileCtrl(userService) {

  var vm = this;
  vm.activate = activate;
  vm.update = update;
  vm.updatePassword = updatePassword;

  activate();

  function activate() {

    var username = localStorage.getItem("username");
    userService.getUserInfo(username).then(function (response) {
      vm.userData = response.data;
    });
  }

  function update() {
    var username = localStorage.getItem("username");
    var data = {
      _id: vm.userData._id,
      email: vm.userData.email,
      username: vm.userData.username
    };
    userService
      .updateUserInfo(username, data)
      .then(function (response) {
        localStorage.setItem("username", response.data.username);
        swal(
          "Profile was updated successfully",
          "Data will apply after log out",
          "success"
        );
      })
      .catch(function () {
        swal(
          "Profile was not updated",
          "Retry",
          "error"
        );
      });
  }

  function updatePassword() {
    var data = {
      _id: vm.userData._id,
      password: vm.settingPassword.password
    };

    var username = localStorage.getItem("username");
    userService.updateUserInfo(username, data)
      .then(function (response) {
        localStorage.setItem("username", response.data.username);
        swal(
          "Profile was updated successfully",
          "Data will apply after log out",
          "success"
        );
      })
      .catch(function () {
        swal(
          "Profile was not updated",
          "Retry",
          "error"
        );
      });
  }
}
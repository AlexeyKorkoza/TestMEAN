"use strict";

angular
  .module("myApp")
  .controller("userProfileCtrl", userProfileCtrl);

userProfileCtrl.$inject = ['userService'];

function userProfileCtrl(userService) {

  const vm = this;
  vm.activate = activate;
  vm.update = update;
  vm.updatePassword = updatePassword;

  activate();

  function activate() {

    const username = localStorage.getItem("username");
    userService.getUserInfo(username)
        .then(response => {
      vm.userData = response.data;
    });
  }

  function update() {
    const username = localStorage.getItem("username");
    const data = {
      _id: vm.userData._id,
      email: vm.userData.email,
      username: vm.userData.username
    };
    userService
      .updateUserInfo(username, data)
      .then(response => {
        localStorage.setItem("username", response.data.username);
        swal(
          "Profile was updated successfully",
          "Data will apply after log out",
          "success"
        );
      })
      .catch(() => {
        swal(
          "Profile was not updated",
          "Retry",
          "error"
        );
      });
  }

  function updatePassword() {
    const data = {
      _id: vm.userData._id,
      password: vm.settingPassword.password
    };

    const username = localStorage.getItem("username");
    userService.updateUserInfo(username, data)
      .then(response => {
        localStorage.setItem("username", response.data.username);
        swal(
          "Profile was updated successfully",
          "Data will apply after log out",
          "success"
        );
      })
      .catch(() => {
        swal(
          "Profile was not updated",
          "Retry",
          "error"
        );
      });
  }
}
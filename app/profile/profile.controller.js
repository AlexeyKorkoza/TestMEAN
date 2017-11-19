'use strict';

angular
  .module('myApp')
  .controller('userProfileCtrl', userProfileCtrl);

userProfileCtrl.$inject = ['$state', 'profileService'];

function userProfileCtrl($state, profileService) {

  const vm = this;
  vm.activate = activate;
  vm.update = update;
  vm.updatePassword = updatePassword;
  vm.id = $state.params.id;

  activate();

  function activate() {
    profileService.get(vm.id)
        .then(response => vm.userData = response.data);
  }

  function update() {
    const data = {
      id: vm.id,
      email: vm.userData.email,
      username: vm.userData.username
    };
      profileService
      .update(data)
      .then(() => {
        swal(
          'profile was updated successfully',
          'Data will apply after log out',
          'success'
        );
      })
      .catch(() => {
        swal(
          'profile was not updated',
          'Retry',
          'error'
        );
      });
  }

  function updatePassword() {
    const data = {
      id: vm.userData.id,
      password: vm.settingPassword.password
    };

      profileService.update(data)
      .then(() => {
        swal(
          'profile was updated successfully',
          'Data will apply after log out',
          'success'
        );
      })
      .catch(() => {
        swal(
          'profile was not updated',
          'Retry',
          'error'
        );
      });
  }
}
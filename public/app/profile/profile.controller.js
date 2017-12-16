'use strict';

angular
  .module('myApp')
  .controller('userProfileCtrl', userProfileCtrl);

userProfileCtrl.$inject = ['profileService', 'immutableService'];

function userProfileCtrl(profileService, immutableService) {

  const vm = this;
  vm.activate = activate;
  vm.update = update;
  vm.updatePassword = updatePassword;

  activate();

  function activate() {
    vm.userData = immutableService.buildProfile().toJS();
  }

  function update() {
    const data = {
      id: vm.userData.id,
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
      .then(() => immutableService.updateProfile(data))
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
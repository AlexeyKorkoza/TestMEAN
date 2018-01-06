profileCtrl.$inject = ['profileService', 'immutableService'];

function profileCtrl(profileService, immutableService) {

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
      old_password: vm.settingPassword.oldPassword,
      new_password: vm.settingPassword.newPassword,
      confirm_password: vm.settingPassword.confirmPassword
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

export default profileCtrl;

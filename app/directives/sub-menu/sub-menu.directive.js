'use strict';

angular
    .module('myApp')
    .directive('subMenu', subMenu);

function subMenu() {
    const directive = {
        templateUrl: './app/directives/sub-menu/sub-menu.html',
        restrict: 'E',
        controller,
    };
    return directive;
}

controller.$inject = ['$state', 'authenticationService', 'userService'];

function controller($state, authenticationService, userService) {

    const vm = this;
    vm.id = '';
    userService.getUser()
        .then(res => {
            vm.id = res.data._id;
        });

    function profile() {
        $state.go('profile', {'id': vm.id});
    }

    function logout() {
        authenticationService.logout();
    }
}

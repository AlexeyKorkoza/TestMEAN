'use strict';

angular
    .module('myApp')
    .directive('navMenu', navMenu);

function navMenu() {
    const directive = {
        templateUrl: './app/directivies/nav-menu/nav-menu.html',
        restrict: 'EA',
        controller,
        controllerAs: 'vm'
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

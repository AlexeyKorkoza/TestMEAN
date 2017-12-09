'use strict';

angular
    .module('myApp')
    .directive('subMenu', subMenu);

function subMenu() {
    const directive = {
        templateUrl: '/public/app/directives/sub-menu/sub-menu.html',
        restrict: 'E',
        link,
    };
    return directive;

    function link(scope) {

        scope.isOpen = false;

        scope.toggleMenu = () => {
            scope.isOpen = !scope.isOpen;
        }
    }
}


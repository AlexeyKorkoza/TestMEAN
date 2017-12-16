'use strict';

angular
    .module('myApp')
    .directive('subMenu', subMenu);

const buildMenu = () => [
    {
        item: 'Map',
        link: 'map',
        class: 'fa fa-globe fa-fw'
    },
    {
        item: 'Types',
        link: 'types_all',
        class: 'fa fa-filter fa-fw'
    },
    {
        item: 'Places',
        link: 'places_all',
        class: 'fa fa-map-marker fa-fw'
    },
    {
        item: 'Profile',
        link: 'profile',
        class: 'fa fa-user fa-fw'
    },
    {
        item: 'Logout',
        link: '/logout',
        class: 'fa fa-sign-out fa-fw'
    }
];

function subMenu() {
    const directive = {
        templateUrl: '/public/app/directives/sub-menu/sub-menu.html',
        restrict: 'E',
        link,
    };
    return directive;

    function link(scope) {

        scope.items = buildMenu();
        scope.isOpen = false;

        scope.toggleMenu = () => {
            scope.isOpen = !scope.isOpen;
        }
    }
}


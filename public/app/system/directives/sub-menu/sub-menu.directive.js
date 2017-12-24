import view from './sub-menu.html';

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
    }
];

function subMenu() {
    const directive = {
        templateUrl: view,
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

export default subMenu;

import template from './side-bar.html';

const buildMenu = () => [
    {
        item: 'Map',
        link: 'map',
        class: 'fa fa-globe fa-fw',
    },
    {
        item: 'Types',
        link: 'types',
        class: 'fa fa-filter fa-fw',
    },
    {
        item: 'Places',
        link: 'places',
        class: 'fa fa-map-marker fa-fw',
    },
    {
        item: 'Profile',
        link: 'profile',
        class: 'fa fa-user fa-fw',
    },
];

sideBar.$inject = ['$document'];

function sideBar($document) {
    const directive = {
        template,
        restrict: 'E',
        link,
    };
    return directive;

    function link(scope, element) {
        scope.items = buildMenu();
        scope.isOpen = false;

        scope.toggleMenu = () => {
            scope.isOpen = !scope.isOpen;
        };

        $document.bind('click', event => {
            const isClickedElementChildOfPopup = element
                .find(event.target)
                .length > 0;

            if (isClickedElementChildOfPopup) { return; }

            scope.isOpen = false;
            scope.$apply();
        });
    }
}

export default sideBar;

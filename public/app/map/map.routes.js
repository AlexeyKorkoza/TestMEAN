import mapView from './views/map.html';

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('map', {
            url: '/',
            template: mapView,
            controller: 'mapCtrl',
            controllerAs: 'vm',
            module: 'map',
            resolve: {
                types: typeService => typeService.getAll()
                    .then(result => result.data),
                places: placeService => placeService.getAll()
                    .then(result => result.data),
            },
        });
}

export default routes;

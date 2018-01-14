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
                types: typeService => typeService.getAll(),
                places: placeService => placeService.getAll()
            }
        })
}

export default routes;

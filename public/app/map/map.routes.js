import mapView from './views/map.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('map', {
            url: '/',
            templateUrl: mapView,
            controller: 'mapCtrl',
            controllerAs: 'vm',
            module: 'map'
        })
}

export default routes;

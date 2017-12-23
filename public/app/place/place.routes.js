import listView from './views/view-places.html';
import addView from './views/add-place.html';
import editView from './views/edit-place.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('places_all', {
            url: '/places',
            templateUrl: listView,
            controller: 'viewPlacesCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
        .state('places_new', {
            url: '/places/add',
            templateUrl: addView,
            controller: 'addPlaceCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
        .state('places_one', {
            url: '/places/:id',
            templateUrl: editView,
            controller: 'editPlaceCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
}

export default routes;

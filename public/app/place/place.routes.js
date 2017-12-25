import listView from './views/list-places.html';
import addView from './views/add-place.html';
import editView from './views/edit-place.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('places_all', {
            url: '/places',
            template: listView,
            controller: 'listPlacesCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
        .state('places_new', {
            url: '/places/add',
            template: addView,
            controller: 'addPlaceCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
        .state('places_one', {
            url: '/places/:id',
            template: editView,
            controller: 'editPlaceCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
}

export default routes;

import listView from './views/list-places.html';
import editorView from './views/editor-place.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('places', {
            url: '/places',
            template: listView,
            controller: 'listPlacesCtrl',
            controllerAs: 'vm',
            module: 'places',
            resolve: {
                places: placeService => placeService.getAll()
                    .then(result => result.data),
            },
        })
        .state('places_new', {
            url: '/places/add',
            template: editorView,
            controller: 'editorPlaceCtrl',
            controllerAs: 'vm',
            module: 'places',
            resolve: {
                types: typeService => typeService.getAll()
                    .then(result => result.data),
            },
        })
        .state('places_one', {
            url: '/places/{id}',
            template: editorView,
            controller: 'editorPlaceCtrl',
            controllerAs: 'vm',
            module: 'places',
            resolve: {
                types: typeService => typeService.getAll()
                    .then(result => result.data),
            },
        });
}

export default routes;

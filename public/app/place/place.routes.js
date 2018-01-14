import listView from './views/list-places.html';
import addView from './views/add-place.html';
import editView from './views/edit-place.html';
import editorView from './views/editor-place.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('places', {
            url: '/places',
            template: listView,
            controller: 'listPlacesCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
        .state('places_new', {
            url: '/places/add',
            template: editorView,
            controller: 'editorPlaceCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
        .state('places_one', {
            url: '/places/{id}',
            template: editorView,
            controller: 'editorPlaceCtrl',
            controllerAs: 'vm',
            module: 'places'
        })
}

export default routes;

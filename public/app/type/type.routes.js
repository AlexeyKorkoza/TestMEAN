import listView from './views/list-types.html';
import addView from './views/add-type.html';
import editView from './views/edit-type.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('types_all', {
            url: '/types',
            template: listView,
            controller: 'listTypesCtrl',
            controllerAs: 'vm',
            module: 'types'
        })
        .state('types_new', {
            url: '/types/add',
            template: addView,
            controller: 'addTypeCtrl',
            controllerAs: 'vm',
            module: 'types'
        })
        .state('types_one', {
            url: '/types/:id',
            template: editView,
            controller: 'editTypeCtrl',
            controllerAs: 'vm',
            module: 'types'
        })
}

export default routes;

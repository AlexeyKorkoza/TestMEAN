import listView from './views/view-types.html';
import addView from './views/add-type.html';
import editView from './views/edit-type.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('types_all', {
            url: '/types',
            templateUrl: listView,
            controller: 'viewTypesCtrl',
            controllerAs: 'vm',
            module: 'types'
        })
        .state('types_new', {
            url: '/types/add',
            templateUrl: editView,
            controller: 'addTypeCtrl',
            controllerAs: 'vm',
            module: 'types'
        })
        .state('types_one', {
            url: '/types/:id',
            templateUrl: addView,
            controller: 'editTypeCtrl',
            controllerAs: 'vm',
            module: 'types'
        })
}

export default routes;

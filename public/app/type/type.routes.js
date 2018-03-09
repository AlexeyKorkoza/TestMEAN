import listView from './views/list-types.html';
import editorView from './views/editor-type.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('types', {
            url: '/types',
            template: listView,
            controller: 'listTypesCtrl',
            controllerAs: 'vm',
            module: 'types',
            resolve: {
                types: typeService => typeService.getAll()
                    .then(result => result.data),
            },
        })
        .state('types_new', {
            url: '/types/add',
            template: editorView,
            controller: 'editorTypeCtrl',
            controllerAs: 'vm',
            module: 'types',
        })
        .state('types_one', {
            url: '/types/{id}',
            template: editorView,
            controller: 'editorTypeCtrl',
            controllerAs: 'vm',
            module: 'types',
        });
}

export default routes;

import template from './views/profile.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile/{id}',
            template,
            controller: 'profileCtrl',
            controllerAs: 'vm',
            module: 'profile'
        })
}

export default routes;

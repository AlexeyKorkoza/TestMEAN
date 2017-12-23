import profileView from './views/profile.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile/{id}',
            templateUrl: profileView,
            controller: 'userProfileCtrl',
            controllerAs: 'vm'
        })
}

export default routes;

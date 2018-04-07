import angular from 'angular';
import uiRouter from 'angular-ui-router';

import profileCtrl from './controllers/profile.controller';
import service from './services/profile.service';
import routes from './profile.routes';

export default angular.module('myApp.profile', [uiRouter])
    .controller('profileCtrl', profileCtrl)
    .factory('profileService', service)
    .config(routes)
    .name;

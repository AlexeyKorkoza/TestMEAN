import angular from 'angular';

import profileCtrl from './controllers/profile.controller';
import service from './services/profile.service';
import routes from './profile.routes';

export default angular.module('myApp.profile')
    .controller(profileCtrl)
    .factory(service)
    .config(routes);

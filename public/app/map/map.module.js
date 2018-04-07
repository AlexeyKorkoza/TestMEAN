import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularLoadingBar from 'angular-loading-bar';

import mapCtrl from './controllers/map.controller';
import routes from './map.routes';

export default angular.module('myApp.map', [uiRouter, angularLoadingBar])
    .controller('mapCtrl', mapCtrl)
    .config(routes)
    .name;

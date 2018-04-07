import angular from 'angular';
import angularLoadingBar from 'angular-loading-bar';
import angularJwt from 'angular-jwt';

import pwCheck from './directives/pw-check/pw-check.directive';
import sideBar from './directives/side-bar/side-bar.directive';
import dropDown from './directives/dropdown/dropdown.directive';
import newButton from './directives/new-button/new-button.directive';
import immutableService from './services/immutable.service';

import config from './system.config';

export default angular.module('myApp.system', [angularLoadingBar, angularJwt])
    .factory('immutableService', immutableService)
    .directive('pwCheck', pwCheck)
    .directive('sideBar', sideBar)
    .directive('dropDown', dropDown)
    .directive('newButton', newButton)
    .config(config)
    .name;

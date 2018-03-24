import angular from 'angular';

import pwCheck from './directives/pw-check/pw-check.directive';
import sideBar from './directives/side-bar/side-bar.directive';
import dropDown from './directives/dropdown/dropdown.directive';
import newButton from './directives/new-button/new-button.directive';
import authService from './services/authentication.service';
import immutableService from './services/immutable.service';

import config from './system.config';

export default angular.module('myApp.system', [])
    .factory('authenticationService', authService)
    .factory('immutableService', immutableService)
    .directive('pwCheck', pwCheck)
    .directive('sideBar', sideBar)
    .directive('dropDown', dropDown)
    .directive('newButton', newButton)
    .config(config)
    .name;

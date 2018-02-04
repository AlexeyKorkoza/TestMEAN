import './directives/dropdown/style.css';

import angular from 'angular';

import pwCheck from './directives/pw-check/pw-check.directive';
import subMenu from './directives/sub-menu/sub-menu.directive';
import dropDown from './directives/dropdown/dropdown.directive';
import authService from './services/authentication.service';
import immutableService from './services/immutable.service';

import config from './system.config';

export default angular.module('myApp.system', [])
    .factory('authenticationService', authService)
    .factory('immutableService', immutableService)
    .directive('pwCheck', pwCheck)
    .directive('subMenu', subMenu)
    .directive('dropDown', dropDown)
    .config(config)
    .name;

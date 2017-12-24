import angular from 'angular';

import pwCheck from './directives/pw-check/pw-check.directive';
import subMenu from './directives/sub-menu/sub-menu.directive';
import authService from './services/authentication.service';
import immutableService from './services/immutable.service';

export default angular.module('myApp.system', [])
    .factory('authenticationService', authService)
    .factory('immutableService', immutableService)
    .directive('pwCheck', pwCheck)
    .directive('subMenu', subMenu)
    .name;

import angular from 'angular';

import listCtrl from './controllers/list-types.controller';
import editorTypeCtrl from './controllers/editor-type.controller';
import service from './services/type.service';
import routes from './type.routes';

export default angular.module('myApp.types', [])
    .controller('listTypesCtrl', listCtrl)
    .controller('editorTypeCtrl', editorTypeCtrl)
    .factory('typeService', service)
    .config(routes)
    .name;
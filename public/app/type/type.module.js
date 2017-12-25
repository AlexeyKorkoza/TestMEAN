import angular from 'angular';

import listCtrl from './controllers/list-types.controller';
import addCtrl from './controllers/add-type.controller';
import editCtrl from './controllers/edit-type.controller';
import service from './services/type.service';
import routes from './type.routes';

export default angular.module('myApp.types', [])
    .controller('listTypesCtrl', listCtrl)
    .controller('addTypeCtrl', addCtrl)
    .controller('editTypeCtrl', editCtrl)
    .factory('typeService', service)
    .config(routes)
    .name;
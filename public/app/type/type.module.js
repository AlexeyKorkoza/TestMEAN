import angular from 'angular';

import listCtrl from './controllers/view-types.controller';
import addCtrl from './controllers/add-type.controller';
import editCtrl from './controllers/edit-type.controller';
import service from './services/type.service';
import routes from './type.routes';

export default angular.module('myApp.types')
    .controller(listCtrl)
    .controller(addCtrl)
    .controller(editCtrl)
    .factory(service)
    .config(routes)
import angular from 'angular';

import listCtrl from './controllers/view-places.controller';
import addCtrl from './controllers/add-place.controller';
import editCtrl from './controllers/edit-place.controller';
import service from './services/place.service';
import routes from './place.routes';

export default angular.module('myApp.places')
    .controller(listCtrl)
    .controller(addCtrl)
    .controller(editCtrl)
    .factory(service)
    .config(routes);

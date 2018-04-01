import angular from 'angular';
import uirouter from 'angular-ui-router';

import listCtrl from './controllers/list-places.controller';
import editorPlaceCtrl from './controllers/editor-place.controller';
import service from './services/place.service';
import routes from './place.routes';

export default angular.module('myApp.places', [uirouter])
    .controller('listPlacesCtrl', listCtrl)
    .controller('editorPlaceCtrl', editorPlaceCtrl)
    .factory('placeService', service)
    .config(routes)
    .name;

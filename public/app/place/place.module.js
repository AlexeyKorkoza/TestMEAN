import angular from 'angular';

import listCtrl from './controllers/list-places.controller';
import addCtrl from './controllers/add-place.controller';
import editCtrl from './controllers/edit-place.controller';
import editorPlaceCtrl from './controllers/editor-place.controller';
import service from './services/place.service';
import routes from './place.routes';

export default angular.module('myApp.places', [])
    .controller('listPlacesCtrl', listCtrl)
    .controller('addPlaceCtrl', addCtrl)
    .controller('editPlaceCtrl', editCtrl)
    .controller('editorPlaceCtrl', editorPlaceCtrl)
    .factory('placeService', service)
    .config(routes)
    .name;

'use strict';

angular
  .module('myApp')
  .controller('addTypeCtrl', function ($scope, typeService) {

    var getAllTypes = "";
    typeService.getAllTypes()
      .then(function (response) {
        getAllTypes = response.data;
      });


  });
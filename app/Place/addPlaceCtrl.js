'use strict';

angular
  .module('myApp')
  .controller('addPlaceCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    var getAllTypes = "";
    $scope.myConfig = {
      create: true,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    $scope.back = function () {
      $location.path('/');
    };
    
    $scope.add = function () {
      
    };
  });
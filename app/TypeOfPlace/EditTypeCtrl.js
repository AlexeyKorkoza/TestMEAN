'use strict';

angular
  .module('myApp')
  .controller('EditTypeCtrl', function ($scope, $location, $timeout, Upload, typeService) {

    var getAllTypes = "";
    getAllTypes = typeService.getTypes();

    $scope.typename = "";
    getAllTypes.forEach(function (item) {
      if (item.id_type === typeService.getId()) {
        $scope.typename = item.name_type;
      }
    });

    $scope.update = function (file) {
      typeService.update($scope.editData, typeService.getId(), file).then(function (response) {
        swal({
          title: "Тип успешно отредактирован",
          text: '<span style="color:#F8BB86">Пожалуйста, нажмите ОК для продолжения<span>',
          confirmButtonText: "ОК",
          html: true
        }), function (isConfirm) {
          if (isConfirm) {
            $location.path('/types');
          }
        }
      });
    };
  });
'use strict';

angular
  .module('myApp')
  .controller('mainCtrl', function ($location, $scope, $http, $timeout, authenticationService, $localStorage, cfpLoadingBar) {

    if ($localStorage.currentUser){
      $scope.isAuthenticated = true;
      $scope.id = $localStorage.currentUser.id;
      $scope.username = $localStorage.currentUser.username;
    } else {
      $scope.isAuthenticated = false;
    }

    angular.extend($scope, {
      grodno: {
        lat: 53.6834599,
        lng: 23.8342648,
        zoom: 13
      },
      markers: {},
      tiles: {
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      }
    });

    $scope.myConfig = {
      create: true,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    $scope.select = [];
    $scope.getAllTypes = function() {
      $http.post('', {'allTypes': 'allTypes'})
        .then(
          function Success(response) {
            $scope.getData = response.data;
            $scope.select.push({
              value: 0,
              text: "Все объекты"
            });
            for (var i = 0; i < response.data.length; i++) {
              $scope.select.push({
                value: response.data[i].id_type,
                text: response.data[i].name_type
              })
            }
          },
          function myError(response) {
            swal({
              title: "Данные с сервера не загрузились!",
              text: '<span style="color:#F8BB86">Пожалуйста, обновите страницу<span>',
              confirmButtonText: "Обновить страницу",
              html: true
            }, function (isConfirm) {
              if (isConfirm) {
                location.reload();
              }
            });
          });
    };

    $scope.getAllPlaces = function() {
      $http.post('', {'allPlaces': 'allPlaces'})
        .then(
          function Success(response) {
            $scope.addPlaceInMap(response.data);
          },
          function Error(response) {
            swal({
              title: "Данные с сервера не загрузились!",
              text: '<span style="color:#F8BB86">Пожалуйста, обновите страницу<span>',
              confirmButtonText: "Обновить страницу",
              html: true
            }, function (isConfirm) {
              if (isConfirm) {
                location.reload();
              }
            });
          });
    };

    $scope.addPlaceInMap = function(response) {
      if ($scope.getData !== '') {
        response.forEach(function (item, i) {
          var typeOfPlace = $scope.getData[item.id_type - 1].name_type;
          var nameOfImage = $scope.getData[item.id_type - 1].image;
          var lat = parseFloat(item.lat);
          var lng = parseFloat(item.lng);
          $scope.markers["marker" + (i + 1)] = {
            lat: lat,
            lng: lng,
            focus: false,
            draggable: false,
            message: "<b>\"" + item.name_place + "\",</b> " + typeOfPlace + "<br>" +
            item.address + "<br/>",
            icon: {
              iconSize: [54, 54],
              iconAnchor: [16, 37],
              popupAnchor: [0, -30],
              iconUrl: './uploads/' + nameOfImage
            }
          }
        });
        cfpLoadingBar.complete();
      } else {
        swal({
          title: "Данные с сервера не загрузились!",
          text: '<span style="color:#F8BB86">Пожалуйста, обновите страницу<span>',
          confirmButtonText: "Обновить страницу",
          html: true
        }, function (isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        });
      }
    };

    $scope.getByType = function (type) {
      $scope.typeIsNumber = parseInt(type);
      cfpLoadingBar.start();
      if ($scope.typeIsNumber === 0) {
        $scope.getAllPlaces();
      } else {
        $scope.markers = {};
        $http.post('', {'type': $scope.typeIsNumber})
          .then(
            function Success(response) {
              $scope.places = response.data;
              $scope.addPlaceInMap($scope.places);
            },
            function Error(response) {
              console.log(response);
            })
      }
    };

    $scope.logout = function () {
      authenticationService.logout();
    };

    cfpLoadingBar.start();
    $scope.getAllTypes();
    $scope.getAllPlaces();
    cfpLoadingBar.complete();
  });
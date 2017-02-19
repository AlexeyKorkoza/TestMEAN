'use strict';

angular
  .module('myApp')
  .controller('mainCtrl', function ($auth, $location, $scope, $http, $timeout, userService, cfpLoadingBar) {

    if ($auth.user.signedIn === true) {
      $scope.sign = true;
      $scope.id = userService.getUserId();
    } else {
      $scope.sign = false;
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

    /*var LeafIcon = L.Icon.extend({
     options: {
     iconSize: [54, 54],
     iconAnchor: [16, 37],
     popupAnchor: [0, -30]
     }
     });
     var markers = new L.FeatureGroup();*/

    $scope.myConfig = {
      create: true,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Выберите тип объекта',
      maxItems: 1
    };

    cfpLoadingBar.start();
    getAllTypes();
    getAllPlaces();
    cfpLoadingBar.complete();

    function getAllTypes() {
      $http.post('', {'allTypes': 'allTypes'})
        .then(
          function Success(response) {
            $scope.getData = response.data;
            $scope.select = [];
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
    }

    function getAllPlaces() {
      $http.post('', {'allPlaces': 'allPlaces'})
        .then(
          function Success(response) {
            addPlaceInMap(response.data);
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
    }

    function addPlaceInMap(response) {
      if ($scope.getData !== '') {
        response.forEach(function (item, i) {
          var typeOfPlace = $scope.getData[item.id_type - 1].name_type;
          var nameOfImage = $scope.getData[item.id_type - 1].marker_img;
          var lat = parseFloat(item.coordinateX);
          var lng = parseFloat(item.coordinateY);
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
              iconUrl: './uploads/' + nameOfImage + '.png',
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
    }

    $scope.getByType = function (type) {
      var typeIsNumber = parseInt(type);
      cfpLoadingBar.start();
      if (typeIsNumber === 0) {
        getAllPlaces();
      } else {
        markers.clearLayers();
        $http.post('', {'type': typeIsNumber})
          .then(
            function Success(response) {
              addPlaceInMap(response.data);
            },
            function Error(response) {
              console.log(response);
            })
      }
    };

    $scope.logout = function () {
      $auth.signOut()
        .then(function () {
          cfpLoadingBar.start();
          $timeout(function () {
            $location.path('/signin');
          }, 2000);
        }).finally(function () {
        cfpLoadingBar.complete();
      });
    };

    $scope.OpenOrCloseUserMenu = function () {
      var usermenu = document.getElementById('menu-of-user');
      var triangle = document.getElementById('triangle');
      if (triangle.className === "triangle-down") {
        triangle.className = "triangle-up";
        usermenu.style.display = "block";
      } else {
        triangle.className = "triangle-down";
        usermenu.style.display = "none";
      }
    };
  });
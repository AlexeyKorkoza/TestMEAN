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

    document.getElementById('init_map').innerHTML = "<div id='map'></div>";
    document.getElementById("map").style.height = window.innerHeight + "px";
    var map = L.map('map').setView([53.6834599, 23.8342648], 13);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 18
    }).addTo(map);

    var LeafIcon = L.Icon.extend({
      options: {
        iconSize: [54, 54],
        iconAnchor: [16, 37],
        popupAnchor: [0, -30]
      }
    });
    var markers = new L.FeatureGroup();
    var routing = L.Routing.control({});

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
        for (var i = 0; i < response.length; i++) {
          var nameOfImage = $scope.getData[response[i].id_type - 1].marker_img;
          var typeOfPlace = $scope.getData[response[i].id_type - 1].name_type;
          var id_place = response[i].id_place;
          var iconPlace = new LeafIcon({iconUrl: "./uploads/" + nameOfImage + ".png"});
          var marker = L.marker([response[i].coordinateX, response[i].coordinateY],
            {icon: iconPlace})
            .bindPopup("<b>\"" + response[i].name_place + "\",</b> " + typeOfPlace + "<br>" +
              response[i].address + "<br/>")
            .openPopup().addTo(map);
          markers.addLayer(marker);
        }
        map.addLayer(markers);
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
      cfpLoadingBar.start();
      if (type === "0") {
        getAllPlaces();
      } else {
        markers.clearLayers();
        $http.post('', {'type': parseInt(type)})
          .then(
            function Success(response) {
              addPlaceInMap(response);
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
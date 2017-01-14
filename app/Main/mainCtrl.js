'use strict';

angular.module('myApp')
  .controller('mainCtrl', function ($auth, $location, $scope, $http, placeService, typeService) {

    if ($auth.user.signedIn === true) {
      $scope.sign = true;
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

    getAllTypes();
    getAllPlaces();

    function getAllTypes() {
      typeService.getAllTypes()
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
      placeService.getAllPlaces()
        .then(
          function Success(response) {
            addPlaceInMap(response);
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
        for (var i = 0; i < response.data.length; i++) {
          var nameOfImage = $scope.getData[response.data[i].id_type - 1].marker_img;
          var typeOfPlace = $scope.getData[response.data[i].id_type - 1].name_type;
          var id_place = response.data[i].id_place;
          var iconPlace = new LeafIcon({iconUrl: "app/img/" + nameOfImage + ".png"});
          var marker = L.marker([response.data[i].coordinateX, response.data[i].coordinateY],
            {icon: iconPlace}).bindPopup("<b>\"" + response.data[i].name_place + "\",</b> " + typeOfPlace + "<br>" +
            response.data[i].address + "<br/>").openPopup().addTo(map);
          markers.addLayer(marker);
        }
        map.addLayer(markers);
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
      if (type === "0") {
        getAllPlaces();
      } else {
        markers.clearLayers();
        typeService.getByType(type)
          .then(
            function Success(response) {
              addPlaceInMap(response);
            },
            function Error(response) {
              console.log(response);
            });
      }
    };

    $scope.logout = function () {
      $auth.signOut()
        .then(function (resp) {
          $location.path('/signin');
        })
    }
  });
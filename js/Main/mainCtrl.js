'use strict';

var myApp = angular.module('myApp');
myApp.controller('mainCtrl', function ($scope) {

  document.getElementById('init_map').innerHTML = "<div id='map'></div>";
  document.getElementById("map").style.height = window.innerHeight + "px";
  var map = L.map('map').setView([53.6834599, 23.8342648], 13);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 18
  }).addTo(map);

  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [25, 41],
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
    $.ajax({
      url: '../../server.php',
      type: 'POST',
      data: {
        'allTypes': 'allTypes'
      },
      async: false,
      success: function (response) {
        $scope.getData = response.types;
        $scope.select = [];
        $scope.select.push({
          value: 0,
          text: "Все объекты"
        });
        for (var i = 0; i < response.types.length; i++) {
          $scope.select.push({
            value: response.types[i].id_type,
            text: response.types[i].name_type
          })
        }
      },
      error: function (response) {
        console.log(response);
      }
    });
  }

  function getAllPlaces() {
    $.ajax({
      url: '../../server.php',
      type: 'POST',
      data: {
        'allPlaces': 'allPlaces'
      },
      async: false,
      success: function (response) {
        addPlaceInMap(response);
      },
      error: function (response) {
        console.log(response);
      }
    });
  }

  function getDirection(currentLat, currentLon) {
    map.removeControl(routing);
    var geoLat = geoip_latitude();
    var geoLon = geoip_longitude();
    routing = L.Routing.control({
      waypoints: [
        L.latLng(geoLat, geoLon),
        L.latLng(currentLat, currentLon)
      ]
    }).addTo(map);
    $(".leaflet-marker-draggable:last-of-type").remove();
  }

  function addPlaceInMap(response) {
    for (var i = 0; i < response.places.length; i++) {
      var nameOfImage = $scope.getData[response.places[i].id_type - 1].marker_img;
      var typeOfPlace = $scope.getData[response.places[i].id_type - 1].name_type;
      var id_place = response.places[i].id_place;
      var iconPlace = new LeafIcon({iconUrl: "img/" + nameOfImage + ".png"});
      var marker = L.marker([response.places[i].coordinateX, response.places[i].coordinateY],
        {icon: iconPlace}).bindPopup("<b>\"" + response.places[i].name_place + "\",</b> " + typeOfPlace + "<br>" +
        response.places[i].address + "<br/>" + "<button class='getDirectionBtn' id=id_place_" + id_place + ">Получить направление</button>").openPopup().addTo(map);
      markers.addLayer(marker);
    }
    map.addLayer(markers);
  }

  $scope.getByType = function (type) {
    if (type === "0") {
      getAllPlaces();
    } else {
      markers.clearLayers();
      $.ajax({
        url: '../../server.php',
        type: 'POST',
        data: {
          'type': type
        },
        success: function (response) {
          addPlaceInMap(response);
        },
        error: function (response) {
          console.log(response);
        }
      });
    }
  };

  markers.on("click", function () {

    $(".getDirectionBtn").on("click", function (e) {
      var arr = e.target.id.split('_');
      var chooseIdPlace = arr[2];
      $.ajax({
        async: false,
        url: '../../server.php',
        type: 'POST',
        data: {
          'chooseIdPlace': chooseIdPlace
        },
        success: function (response) {
          getDirection(response.chooseIdPlace[0].coordinateX, response.chooseIdPlace[0].coordinateY);
        },
        error: function (response) {
          console.log(response);
        }
      });
    });
  });
});
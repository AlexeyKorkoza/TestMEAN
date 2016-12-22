'use strict';

var myApp = angular.module('myApp');
myApp.controller('mainCtrl', function ($scope,$http) {

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
      url: 'http://localhost:8080/',
      type: 'POST',
      data: 'allTypes',
      async: false,
      success: function (response, status) {
        console.log(response);
        console.log(status);
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
      error: function (response, status) {
        console.log(response);
        console.log(status);
      }
    });
  }

  function getAllPlaces() {
    var insertData= {
      'allPlaces': 'allPlaces'
    };
    var query = $http({
      url: '',
      method: 'post',
      data: 'mydata='+JSON.stringify(insertData),
      async: false
    });
      query.success(function (response, status) {
        console.log(response);
        console.log(status);
        addPlaceInMap(response);
        });
      query.error(function (response, status) {
        console.log(response);
        console.log(status);
    });
  }

  function addPlaceInMap(response) {
    for (var i = 0; i < response.places.length; i++) {
      var nameOfImage = $scope.getData[response.places[i].id_type - 1].marker_img;
      var typeOfPlace = $scope.getData[response.places[i].id_type - 1].name_type;
      var id_place = response.places[i].id_place;
      var iconPlace = new LeafIcon({iconUrl: "img/" + nameOfImage + ".png"});
      var marker = L.marker([response.places[i].coordinateX, response.places[i].coordinateY],
        {icon: iconPlace}).bindPopup("<b>\"" + response.places[i].name_place + "\",</b> " + typeOfPlace + "<br>" +
        response.places[i].address + "<br/>").openPopup().addTo(map);
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
        url: '',
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
});
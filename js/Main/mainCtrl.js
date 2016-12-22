'use strict';

var myApp = angular.module('myApp');
myApp.controller('mainCtrl', function ($scope, $http) {

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

  $scope.getAllTypes = function () {
    $http({
      url: 'http://localhost:8080/',
      method: 'post',
      data: {
        'allTypes': 'allTypes'
      },
      headers: {'Content-Type': 'application/json'}
    }).then(
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
  };

  $scope.getAllPlaces = function () {
    $http({
      url: 'http://localhost:8080/',
      method: 'post',
      data: {
        'allPlaces': 'allPlaces'
      },
      headers: {'Content-Type': 'application/json'}
    }).then(
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
  };

  $scope.getAllTypes();
  $scope.getAllPlaces();

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
      $scope.getAllPlaces();
    } else {
      markers.clearLayers();
      $http({
        url: 'http://localhost:8080/',
        method: 'post',
        data: {
          'type': type
        },
        headers: {'Content-Type': 'application/json'}
      }).then(
        function Success(response) {
          addPlaceInMap(response);
        },
        function Error(response) {
          console.log(response);
        });
    }
  };
});
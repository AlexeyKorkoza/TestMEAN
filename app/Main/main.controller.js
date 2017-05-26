"use strict";

angular
  .module("myApp")
  .controller("mainCtrl", mainCtrl);

mainCtrl.$inject = ['$http', '$location', 'cfpLoadingBar', 'authenticationService', 'mainService'];

function mainCtrl($http, $location, cfpLoadingBar, authenticationService, mainService) {

  var vm = this;
  vm.group_markers = [];
  vm.select = [];
  vm.isAuthenticated = false;
  vm.getAllPlaces = getAllPlaces;
  vm.getAllTypes = getAllTypes;
  vm.addPlaceInMap = addPlaceInMap;
  vm.getByType = getByType;
  vm.logout = logout;
  vm.activate = activate;

  activate();

  function activate() {
    if (localStorage.getItem("username")) {
      vm.isAuthenticated = true;
    }

    angular.extend(vm, {
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

    vm.myConfig = {
      create: false,
      valueField: "value",
      labelField: "text",
      delimiter: "|",
      placeholder: "Выберите тип объекта",
      maxItems: 1
    };
    cfpLoadingBar.start();
    vm.getAllTypes();
    vm.getAllPlaces();
    cfpLoadingBar.complete();
  }

  function getAllTypes() {
    mainService.getAllTypes().then(
      function Success(response) {
        vm.getData = response.data;
        vm.select.push({
          value: 0,
          text: "Все объекты"
        });
        for (var i = 0; i < response.data.length; i++) {
          vm.select.push({
            value: response.data[i].id_type,
            text: response.data[i].name_type
          });
        }
      },
      function myError() {
        dataNoLoad();
      }
    );
  }

  function getAllPlaces() {
    mainService.getAllPlaces().then(
      function Success(response) {
        vm.addPlaceInMap(response.data);
      },
      function Error() {
        dataNoLoad();
      }
    );
  }

  function addPlaceInMap(response) {
    if (vm.getData !== "") {
      response.forEach(function (item, i) {
        var typeOfPlace = vm.getData[item.id_type - 1].name_type;
        var nameOfImage = vm.getData[item.id_type - 1].image;
        var lat = parseFloat(item.lat);
        var lng = parseFloat(item.lng);
        vm.markers["marker" + (i + 1)] = {
          lat: lat,
          lng: lng,
          focus: false,
          draggable: false,
          group: 'vm.group_markers',
          message: '<b>"' +
          item.name_place +
          '",</b> ' +
          typeOfPlace +
          "<br>" +
          item.address +
          "<br/>",
          icon: {
            iconSize: [54, 54],
            iconAnchor: [16, 37],
            popupAnchor: [0, -30],
            iconUrl: "./uploads/" + nameOfImage
          }
        };
      });
      cfpLoadingBar.complete();
    } else {
      dataNoLoad();
    }
  }

  function getByType() {
    vm.typeIsNumber = parseInt(vm.type);
    cfpLoadingBar.start();
    if (vm.typeIsNumber === 0) {
      vm.getAllPlaces();
    } else {
      vm.markers = {};
      mainService.getByType(vm.typeIsNumber).then(
        function Success(response) {
          vm.places = response.data;
          vm.addPlaceInMap(vm.places);
        }
      );
    }
  }

  function logout() {
    authenticationService.logout();
  }

  function dataNoLoad() {
    swal(
      {
        title: "Данные с сервера не загрузились!",
        text: '<span style="color:#F8BB86">Пожалуйста, обновите страницу<span>',
        confirmButtonText: "Обновить страницу",
        html: true
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }

}
"use strict";

angular
  .module("myApp")
  .controller("mainCtrl", mainCtrl);

mainCtrl.$inject = ['$state', 'cfpLoadingBar', 'authenticationService', 'placeService', 'typeService', 'userData'];

function mainCtrl($state, cfpLoadingBar, authenticationService, placeService, typeService, userData) {

  const vm = this;
  vm.group_markers = [];
  vm.select = [];
  vm.id = '';
  vm.isAuthenticated = false;
  vm.getAllPlaces = getAllPlaces;
  vm.getAllTypes = getAllTypes;
  vm.addPlaceInMap = addPlaceInMap;
  vm.getPlacesByType = getPlacesByType;
  vm.profile = profile;
  vm.logout = logout;
  vm.activate = activate;

  activate();

  function activate() {
    if (localStorage.getItem('token')) {
      vm.isAuthenticated = true;
      vm.id = userData.data._id;
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
      placeholder: "Choose type object",
      maxItems: 1
    };
    cfpLoadingBar.start();
    vm.getAllTypes();
    vm.getAllPlaces();
    cfpLoadingBar.complete();
    dataNoLoad();
  }

  function getAllTypes() {
    typeService.getAll()
        .then(response => {
        vm.getData = response.data;
        vm.select.push({
          value: 0,
          text: "Все объекты"
        });
        if (!response.data) {
            response.data.forEach(item => {
                vm.select.push({
                    value: item.id_type,
                    text: item.name_type
                });
            });
        }
      });
  }

  function getAllPlaces() {
    placeService.getAll()
        .then(response => {
        vm.addPlaceInMap(response.data);
      })
        .catch(err => {
        dataNoLoad();
      }
    );
  }

  function addPlaceInMap(response) {
    if (!vm.getData) {
     response.forEach((item, i) => {
        const typeOfPlace = vm.getData[item.id_type - 1].name_type;
        const nameOfImage = vm.getData[item.id_type - 1].image;
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lng);
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
    }
  }

  function getPlacesByType() {
    vm.typeIsNumber = parseInt(vm.type);
    cfpLoadingBar.start();
    if (vm.typeIsNumber === 0) {
      vm.getAllPlaces();
    } else {
      vm.markers = {};
      placeService.getPlacesByType(vm.typeIsNumber)
          .then(response => {
          vm.places = response.data;
          vm.addPlaceInMap(vm.places);
        }
      );
    }
  }

  function profile() {
      $state.go('profile', {'id': vm.id});
  }

  function logout() {
    authenticationService.logout();
  }

  function dataNoLoad() {

    if (!vm.isAuthenticated && !vm.places && !vm.select.length) {
      swal(
        {
          title: "Please log in or sign up",
          text: '<span style="color:#F8BB86">Please log in or sign up<span>',
          confirmButtonText: "OK",
          html: true
        });
    }

    if (!vm.isAuthenticated && vm.places && vm.select.length) {
      swal(
        {
          title: "Please log in or sign up",
          text: '<span style="color:#F8BB86">Please log in or sign up<span>',
          confirmButtonText: "OK",
          html: true
        }
      );
    }

    if (vm.isAuthenticated && !vm.select) {
      swal(
        {
          title: "No categories of places",
          text: '<span style="color:#F8BB86">Please, add new category of places<span>',
          confirmButtonText: "Add new category",
          html: true
        },
        isConfirm => {
          if (isConfirm) {
            window.href = '/types/add';
          }
        }
      );
    }

    if (vm.isAuthenticated && vm.select.length && !vm.places) {
      swal(
        {
          title: "No places",
          text: '<span style="color:#F8BB86">Please, add new place<span>',
          confirmButtonText: "Add new place",
          html: true
        },
        isConfirm => {
          if (isConfirm) {
            window.href = '/places/add';
          }
        }
      );
    }
  }
}
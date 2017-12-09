'use strict';

describe("placeService", () => {

  beforeEach(module('myApp'));

  it('Get data', inject(($httpBackend, $http) => {

    let vm = {};

    $http.get('http://localhost:8080/places')
      .success(function (data) {
        vm.valid = true;
        vm.response = data;
      })
      .error(function () {
        vm.valid = false;
      });

    $httpBackend
      .when('GET', 'http://localhost:8080/places')
      .respond(200, {
        _id: 'ObjectId("58beb4005f227b39482b0aac")',
        name_place: 'Аптечка',
        description: 'Крутое место',
        lat: '53.662',
        lng: '23.782',
        address: 'Фолюш',
        id_type: 1
      });

    $httpBackend.flush();

    expect(vm.valid).toBe(true);
    expect(vm.response).toEqual({
      _id: 'ObjectId("58beb4005f227b39482b0aac")',
      name_place: 'Аптечка',
      description: 'Крутое место',
      lat: '53.662',
      lng: '23.782',
      address: 'Фолюш',
      id_type: 1
    });

  }));
});

'use strict';

describe("placeService", function () {

  beforeEach(module('myApp'));

  it('Get data', inject(function ($httpBackend, $http) {

    var $scope = {};

    $http.get('http://localhost:8080/places')
      .success(function (data) {
        $scope.valid = true;
        $scope.response = data;
      })
      .error(function () {
        $scope.valid = false;
      });

    $httpBackend
      .when('GET', 'http://localhost:8080/places')
      .respond(200, {
        "_id": 'ObjectId("58beb4005f227b39482b0aac")',
        "name_place": "Аптечка",
        "description": "Крутое место",
        "lat": "53.662",
        "lng": "23.782",
        "address": "Фолюш",
        "id_type": 1
      });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual({
      "_id": 'ObjectId("58beb4005f227b39482b0aac")',
      "name_place": "Аптечка",
      "description": "Крутое место",
      "lat": "53.662",
      "lng": "23.782",
      "address": "Фолюш",
      "id_type": 1
    });

  }));
});

'use strict';

describe("typeService", function () {

  beforeEach(module('myApp'));

  it('Get data', inject(function ($httpBackend, $http) {

    var $scope = {};

    $http.get('http://localhost:8080/types')
      .success(function (data) {
        $scope.valid = true;
        $scope.response = data;
      })
      .error(function () {
        $scope.valid = false;
      });

    $httpBackend
      .when('GET', 'http://localhost:8080/types')
      .respond(200, {
        "_id": 'ObjectId("58bdd4ba32f6ef17305f58c2")',
        "id_type": 1,
        "name_type": "Аптека",
        "image": "Аптека.png"
      });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual({
      "_id": 'ObjectId("58bdd4ba32f6ef17305f58c2")',
      "id_type": 1,
      "name_type": "Аптека",
      "image": "Аптека.png"
    });

  }));
});

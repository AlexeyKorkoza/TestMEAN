'use strict';

describe("userService", function () {

  beforeEach(module('myApp'));

  it('Post data', inject(function ($httpBackend, $http) {

    var $scope = {};

    $http.get('http://localhost:8080/users/1')
      .success(function (data) {
        $scope.valid = true;
        $scope.response = data;
      })
      .error(function () {
        $scope.valid = false;
      });

    $httpBackend
      .when('GET', 'http://localhost:8080/users/1')
      .respond(200, {
        "_id": 'ObjectId("58bdc9ed5616221258934c06")',
        "username": "alex",
        "password": "55dc87c47427",
        "email": "example@mail.com",
        "date": "01.03.2017"
      });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual({
      "_id": 'ObjectId("58bdc9ed5616221258934c06")',
      "username": "alex",
      "password": "55dc87c47427",
      "email": "example@mail.com",
      "date": "01.03.2017"
    });

  }));
});

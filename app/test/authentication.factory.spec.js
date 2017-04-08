'use strict';

describe("typeService", function () {

  beforeEach(module('myApp'));

  it('Get data', inject(function ($httpBackend, $http) {

    var $scope = {};

    $http.post('http://localhost:8080/auth/login', {
      username: 'alex',
      password: '123456'
    })
      .success(function (data) {
        $scope.valid = true;
        $scope.response = data;
      });

    $httpBackend
      .when('POST', 'http://localhost:8080/auth/login')
      .respond(200, {
        id: 1, username: '123456'
      });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual({
      id: 1,
      username: '123456'
    });

  }));
});

'use strict';

describe("userService", () => {

  beforeEach(module('myApp'));

  it('Post data', inject(($httpBackend, $http) => {

    let vm = {};

    $http.get('http://localhost:8080/users/1')
      .success(function (data) {
        vm.valid = true;
        vm.response = data;
      })
      .error(function () {
        vm.valid = false;
      });

    $httpBackend
      .when('GET', 'http://localhost:8080/users/1')
      .respond(200, {
        _id: 'ObjectId("58bdc9ed5616221258934c06")',
        username: 'alex',
        password: '55dc87c47427',
        email: 'example@mail.com'
      });

    $httpBackend.flush();

    expect(vm.valid).toBe(true);
    expect(vm.response).toEqual({
      _id: 'ObjectId("58bdc9ed5616221258934c06")',
      username: 'alex',
      password: '55dc87c47427',
      email: 'example@mail.com'
    });

  }));
});

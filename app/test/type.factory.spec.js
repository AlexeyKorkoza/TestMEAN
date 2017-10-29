'use strict';

describe("typeService", () => {

  beforeEach(module('myApp'));

  it('Get data', inject(($httpBackend, $http) => {

    let vm = {};

    $http.get('http://localhost:8080/types')
      .success(data => {
        vm.valid = true;
        vm.response = data;
      })
      .error(() => {
        vm.valid = false;
      });

    $httpBackend
      .when('GET', 'http://localhost:8080/types')
      .respond(200, {
        _id: 'ObjectId("58bdd4ba32f6ef17305f58c2")',
        id_type: 1,
        name_type: 'Аптека',
        image: 'Аптека.png'
      });

    $httpBackend.flush();

    expect(vm.valid).toBe(true);
    expect(vm.response).toEqual({
      _id: 'ObjectId("58bdd4ba32f6ef17305f58c2")',
      id_type: 1,
      name_type: 'Аптека',
      image: 'Аптека.png'
    });

  }));
});

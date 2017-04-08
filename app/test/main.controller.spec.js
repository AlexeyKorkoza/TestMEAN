'use strict';

describe('mainCtrl', function () {

  var ctrl;
  var scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();
    ctrl = $controller('mainCtrl', {$scope: scope});

  }));

  it('Check initialize of controller', function () {
    expect(ctrl).not.toBeUndefined();
  });

  it('should init an empty array of select', function () {
    expect(scope.select).toBeDefined();
    expect(scope.select.length).toEqual(0);
  });

  it('add default value in select', function () {
    scope.select.push({
      value: 0,
      text: "Все объекты"
    });
    expect(scope.select.length).toEqual(1);
  });

});
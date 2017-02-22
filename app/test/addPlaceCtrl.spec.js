'use strict';

describe("addPlaceCtrl", function () {

  var ctrl;
  var scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();
    ctrl = $controller('addPlaceCtrl', {$scope: scope});

  }));

  it('Check initialize of controller', function () {
    expect(ctrl).not.toBeUndefined();
  });

  it('Select is defined', function () {
    expect(scope.select).toBeDefined();
  });

  it('Add in select', function () {
    scope.select.push({
      value: "1",
      text: "Клуб"
    });
    expect(scope.select.length).toEqual(1);
  });
});

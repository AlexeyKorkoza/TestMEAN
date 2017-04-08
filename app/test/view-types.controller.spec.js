'use strict';

describe("ViewTypesCtrl", function () {

  var ctrl;
  var scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();
    ctrl = $controller('ViewTypesCtrl', {$scope: scope});

  }));

  it('Check initialize of controller', function () {
    expect(ctrl).not.toBeUndefined();
  });

  it('Check initialize of variable in controller', function () {
    expect(scope.types).not.toBeUndefined();
  });

});
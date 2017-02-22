'use strict';

describe("AddTypeCtrl", function () {

  var ctrl;
  var scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();
    ctrl = $controller('AddTypeCtrl', {$scope: scope});

  }));

  it('Check initialize of controller', function () {
    expect(ctrl).not.toBeUndefined();
  });

  it('Check initialize of variable in controller', function () {
    expect(scope.getAllTypes).not.toBeUndefined();
  });

});
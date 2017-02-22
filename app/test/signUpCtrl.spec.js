'use strict';

describe("signUpCtrl", function () {

  var ctrl;
  var scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();
    ctrl = $controller('signUpCtrl', {$scope: scope});

  }));

  it('Check initialize of controller', function () {
    expect(ctrl).not.toBeUndefined();
  });

  it('Initialize variable', function () {
    expect(scope.getAllUsers).toBeDefined();
  });

});

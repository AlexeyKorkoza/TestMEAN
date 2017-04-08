'use strict';

describe("signInCtrl", function () {

  var ctrl;
  var scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();
    ctrl = $controller('signInCtrl', {$scope: scope});

  }));

  it('Check initialize of controller', function () {
    expect(ctrl).not.toBeUndefined();
  });

});

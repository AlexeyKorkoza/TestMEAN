'use strict';

describe("signInCtrl", function () {

  var vm;

  beforeEach(module("myApp"));
  beforeEach(
    inject(function($controller) {
      vm = $controller("signInCtrl", {}, {});
    })
  );

  it('Check initialize of controller', function () {
    expect(vm).not.toBeUndefined();
  });

});

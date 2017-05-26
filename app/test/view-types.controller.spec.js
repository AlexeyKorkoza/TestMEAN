'use strict';

describe("ViewTypesCtrl", function () {

  var vm;

  beforeEach(module("myApp"));
  beforeEach(
    inject(function($controller) {
      vm = $controller("viewTypesCtrl", {}, {});
    })
  );

  it('Check initialize of controller', function () {
    expect(vm).not.toBeUndefined();
  });

  it('Check initialize of variable in controller', function () {
    expect(vm.types).not.toBeUndefined();
  });

});
'use strict';

describe("ViewTypesCtrl", () => {

  let vm = {};

  beforeEach(module("myApp"));
  beforeEach(
    inject($controller => {
      vm = $controller("viewTypesCtrl", {}, {});
    })
  );

  it('Check initialize of controller', () => {
    expect(vm).not.toBeUndefined();
  });

  it('Check initialize of variable in controller', () => {
    expect(vm.types).not.toBeUndefined();
  });

});
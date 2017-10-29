'use strict';

describe("AddTypeCtrl", () => {

  let vm = {};

  beforeEach(module("myApp"));
  beforeEach(
    inject($controller => {
      vm = $controller("addTypeCtrl", {}, {});
    })
  );

  it('Check initialize of controller', () => {
    expect(vm).not.toBeUndefined();
  });

  it('Check initialize of variable in controller', () => {
    expect(vm.filename).toEqual("Иконка не выбрана");
  });

});
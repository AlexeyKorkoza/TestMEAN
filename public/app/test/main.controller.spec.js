"use strict";

describe("mapCtrl", () => {

  let vm = {};

  beforeEach(module("myApp"));
  beforeEach(
    inject($controller => {
      vm = $controller("mapCtrl", {}, {});
    })
  );

  it("Check initialize of controller", () => {
    expect(vm).not.toBeUndefined();
  });

  it("should init an empty array of select", () => {
    expect(vm.select).toBeDefined();
    expect(vm.select.length).toEqual(0);
  });

  it("add default value in select", () => {
    vm.select.push({
      value: 0,
      text: "Все объекты"
    });
    expect(vm.select.length).toEqual(1);
  });
});

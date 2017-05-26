"use strict";

describe("mainCtrl", function() {
  var vm;

  beforeEach(module("myApp"));
  beforeEach(
    inject(function($controller) {
      vm = $controller("mainCtrl", {}, {});
    })
  );

  it("Check initialize of controller", function() {
    expect(vm).not.toBeUndefined();
  });

  it("should init an empty array of select", function() {
    expect(vm.select).toBeDefined();
    expect(vm.select.length).toEqual(0);
  });

  it("add default value in select", function() {
    vm.select.push({
      value: 0,
      text: "Все объекты"
    });
    expect(vm.select.length).toEqual(1);
  });
});

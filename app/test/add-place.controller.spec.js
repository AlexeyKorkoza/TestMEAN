'use strict';

describe("addPlaceCtrl", function () {

  var vm;

  beforeEach(module("myApp"));
  beforeEach(
    inject(function($controller) {
      vm = $controller("addPlaceCtrl", {}, {});
    })
  );

  it('Check initialize of controller', function () {
    expect(vm).not.toBeUndefined();
  });

  it('Select is defined', function () {
    expect(vm.select).toBeDefined();
  });

  it('Add in select', function () {
    vm.select.push({
      value: "1",
      text: "Клуб"
    });
    expect(vm.select.length).toEqual(1);
  });
});

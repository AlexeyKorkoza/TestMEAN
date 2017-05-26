'use strict';

describe("AddTypeCtrl", function () {

  var vm;

  beforeEach(module("myApp"));
  beforeEach(
    inject(function($controller) {
      vm = $controller("addTypeCtrl", {}, {});
    })
  );

  it('Check initialize of controller', function () {
    expect(vm).not.toBeUndefined();
  });

  it('Check initialize of variable in controller', function () {
    expect(vm.filename).toEqual("Иконка не выбрана");
  });

});
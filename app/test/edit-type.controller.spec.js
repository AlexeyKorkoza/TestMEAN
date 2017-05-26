'use strict';

describe("EditTypeCtrl", function () {

  var vm;

  beforeEach(module("myApp"));
  beforeEach(
    inject(function($controller) {
      vm = $controller("editTypeCtrl", {}, {});
    })
  );

  it('Check initialize of controller', function () {
    expect(vm).not.toBeUndefined();
  });

});
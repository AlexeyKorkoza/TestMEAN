'use strict';

describe("editPlaceCtrl", () => {

  let vm = {};

  beforeEach(module("myApp"));
  beforeEach(
    inject($controller => {
      vm = $controller("editPlaceCtrl", {}, {});
    })
  );

  it('Check initialize of controller', () => {
    expect(vm).not.toBeUndefined();
  });

});

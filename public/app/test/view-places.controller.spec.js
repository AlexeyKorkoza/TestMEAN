'use strict';

describe("viewPlaceCtrl", () => {

  let vm = {};

  beforeEach(module("myApp"));
  beforeEach(
    inject($controller => {
      vm = $controller("viewPlacesCtrl", {}, {});
    })
  );

  it('Check initialize of controller', () => {
    expect(vm).not.toBeUndefined();
  });

});
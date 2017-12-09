'use strict';

describe("signInCtrl", () => {

  let vm = {};

  beforeEach(module("myApp"));
  beforeEach(
    inject($controller => {
      vm = $controller("signInCtrl", {}, {});
    })
  );

  it('Check initialize of controller', () => {
    expect(vm).not.toBeUndefined();
  });

});

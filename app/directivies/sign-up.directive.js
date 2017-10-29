"use strict";

angular
  .module("myApp")
  .directive("pwCheck", pwCheck);

function pwCheck() {
  return {
    restrict: "A",
    require: "ngModel",
    link: (scope, elem, attrs, ctrl) => {
      const firstPassword = "#" + attrs.pwCheck;
      elem.add(firstPassword).on("keyup", function () {
        scope.$apply(function () {
          const v = elem.val() === $(firstPassword).val();
          ctrl.$setValidity("pwmatch", v);
        });
      });
    }
  };
}
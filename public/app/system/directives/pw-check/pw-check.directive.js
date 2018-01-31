import $ from 'jquery';

function pwCheck() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, elem, attrs, ctrl) => {
            const firstPassword = `#${attrs.pwCheck}`;
            elem.add(firstPassword).on('keyup', () => {
                scope.$apply(() => {
                    const v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        },
    };
}

export default pwCheck;

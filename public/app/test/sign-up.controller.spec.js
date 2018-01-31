

describe('signUpCtrl', () => {
    let vm;

    beforeEach(module('myApp'));
    beforeEach(inject($controller => {
        vm = $controller('signUpCtrl', {}, {});
    }));

    it('Check initialize of controller', () => {
        expect(vm).not.toBeUndefined();
    });
});

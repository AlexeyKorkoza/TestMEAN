

describe('userProfileCtrl', () => {
    let vm = {};

    beforeEach(module('myApp'));
    beforeEach(inject($controller => {
        vm = $controller('userProfileCtrl', {}, {});
    }));

    it('Check initialize of controller', () => {
        expect(vm).not.toBeUndefined();
    });
});

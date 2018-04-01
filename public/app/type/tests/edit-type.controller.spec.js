

describe('EditTypeCtrl', () => {
    let vm = {};

    beforeEach(module('myApp'));
    beforeEach(inject($controller => {
        vm = $controller('editTypeCtrl', {}, {});
    }));

    it('Check initialize of controller', () => {
        expect(vm).not.toBeUndefined();
    });
});

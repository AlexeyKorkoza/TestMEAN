

describe('addPlaceCtrl', () => {
    let vm = {};

    beforeEach(module('myApp'));
    beforeEach(inject($controller => {
        vm = $controller('addPlaceCtrl', {}, {});
    }));

    it('Check initialize of controller', () => {
        expect(vm).not.toBeUndefined();
    });

    it('Select is defined', () => {
        expect(vm.select).toBeDefined();
    });

    it('Add in select', () => {
        vm.select.push({
            value: '1',
            text: 'Клуб',
        });
        expect(vm.select.length).toEqual(1);
    });
});

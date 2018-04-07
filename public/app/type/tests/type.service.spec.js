import angular from 'angular';

describe('typeService', () => {
    let typeService;

    beforeEach(angular.mock.module('myApp.types'));
    beforeEach(inject($injector => {
        typeService = $injector.get('typeService');
    }));

    it('Should methods existing', () => {
        expect(typeService.getAll).toBeDefined();
        expect(typeService.create).toBeDefined();
        expect(typeService.remove).toBeDefined();
        expect(typeService.update).toBeDefined();
        expect(typeService.getTypeById).toBeDefined();
    });
});

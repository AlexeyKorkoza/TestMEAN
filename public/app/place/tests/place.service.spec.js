import angular from 'angular';

describe('placeService', () => {
    beforeEach(angular.mock.module('myApp.places'));

    it('Should methods existing', inject(placeService => {
        expect(placeService.getAll).toBeDefined();
        expect(placeService.create).toBeDefined();
        expect(placeService.remove).toBeDefined();
        expect(placeService.update).toBeDefined();
        expect(placeService.getPlaceById).toBeDefined();
    }));
});

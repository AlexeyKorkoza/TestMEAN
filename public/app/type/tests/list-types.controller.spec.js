import angular from 'angular';

let controller;

describe('listTypesCtrl', () => {
    let typeService;

    beforeEach(angular.mock.module('myApp.types'));
    beforeEach(inject($controller => {
        controller = $controller('listTypesCtrl', {
            typeService,
            types: [{
                _id: '5a7b6267ae18f72a50ba4988',
                name: 'erreer',
                image: 'erreer.png',
                places: [],
                date: '2018-02-07T20:31:31.405Z',
            }],
        });
    }));

    it('Check initialize of controller', () => {
        expect(controller).not.toBeUndefined();
    });

    it('Check initialize of variable in controller', () => {
        expect(controller.types).not.toBeUndefined();
    });
});

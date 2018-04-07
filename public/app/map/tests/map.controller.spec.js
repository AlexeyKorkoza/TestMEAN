import angular from 'angular';

let controller;

describe('mapCtrl', () => {

    let placeService;
    beforeEach(angular.mock.module('myApp.map'));
    beforeEach(inject(($controller, cfpLoadingBar) => {
        controller = $controller('mapCtrl', {
            cfpLoadingBar,
            placeService,
            types: [],
            places: [],
        });
    }));

    it('Should initialize controller', () => {
        expect(controller).not.toBeUndefined();
    });

    it('Should initialize an empty array of types', () => {
        expect(controller.types).toBeDefined();
        expect(controller.types.length).toEqual(0);
    });

    it('Should add type in types', () => {
        controller.types.push({
            _id: 0,
            text: 'Все объекты',
        });
        expect(controller.types.length).toEqual(1);
    });

    it('Should initialize an empty array of places', () => {
        expect(controller.allPlacesByUser).toBeDefined();
        expect(controller.allPlacesByUser.length).toEqual(0);
    });

    it('Should add place in places', () => {
        controller.allPlacesByUser.push({
            _id: '5aad0b3f2294a83240128917',
            name: 'Pizza coffee',
            description: 'goood',
            lat: '53.6693538',
            lng: '23.813130600000022',
            address: 'Grodno, Belarus',
            date: '2018-03-10T12:24:13.476Z',
        });
        expect(controller.allPlacesByUser.length).toEqual(1);
    });
});

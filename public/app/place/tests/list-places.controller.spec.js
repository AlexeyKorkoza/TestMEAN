import angular from 'angular';

let controller;

describe('listPlacesCtrl', () => {

    let placeService;
    beforeEach(angular.mock.module('myApp.places'));
    beforeEach(inject($controller => {
        controller = $controller('listPlacesCtrl', {
            placeService,
            places: [{
                _id: '5aad0b3f2294a83240128917',
                name: 'Pizza coffee',
                description: 'goood',
                lat: '53.6693538',
                lng: '23.813130600000022',
                address: 'Grodno, Belarus',
                date: '2018-03-10T12:24:13.476Z',
            }],
        });
    }));

    it('Should be initialize of controller', () => {
        expect(controller).toBeDefined();
    });
});

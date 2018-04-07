import angular from 'angular';

let controller;

describe('editorPlaceCtrl', () => {

    let placeService;
    let state;
    beforeEach(angular.mock.module('myApp.places'));
    beforeEach(inject($controller => {
        controller = $controller('editorPlaceCtrl', {
            state,
            placeService,
            types: [{
                _id: '5a7b6267ae18f72a50ba4988',
                name: 'erreer',
                image: 'erreer.png',
                places: [],
                date: '2018-02-07T20:31:31.405Z',
            }],
        });
    }));

    it('Should be initialize of controller', () => {
        expect(controller).toBeDefined();
    });

    it('Should add new place', () => {
        const places = [{
            _id: '5aad0b3f2294a83240128917',
            name: 'Pizza coffee',
            description: 'goood',
            lat: '53.6693538',
            lng: '23.813130600000022',
            address: 'Grodno, Belarus',
            date: '2018-03-10T12:24:13.476Z',
        }];
        const { length } = places;
        const place = {
            _id: '5aad0b3f2294a83240128918',
            name: 'Pizza coffee',
            description: 'goood',
            lat: '53.6693538',
            lng: '23.813130600000022',
            address: 'Grodno, Belarus',
            date: '2018-03-15T12:24:13.476Z',
        };
        places.push(place);
        expect(places.length).toEqual(length + 1);
    });
});

import angular from 'angular';

let controller;

describe('editorTypeCtrl', () => {

    let state;
    let Upload;
    let typeService;
    let types;
    beforeEach(angular.mock.module('myApp.types'));
    beforeEach(inject($controller => {
        controller = $controller('editorTypeCtrl', {
            state,
            Upload,
            typeService,
            types,
        });
    }));

    it('Check initialize of controller', () => {
        expect(controller).not.toBeUndefined();
    });

    it('Should rename place type', () => {
        const type = {
            name: 'Sport',
        };
        type.name = 'Club';
        expect(type.name).toEqual('Club');
    });
});

import angular from 'angular';

let controller;

describe('profileCtrl', () => {

    let profileService;
    beforeEach(angular.mock.module('myApp.profile'));
    beforeEach(angular.mock.module('myApp.system'));
    beforeEach(inject(($controller, immutableService) => {
        controller = $controller('profileCtrl', {
            profileService,
            immutableService,
        });
    }));

    const user = {
        id: 1,
        email: 'email@test.com',
        username: 'John',
        date: new Date(),
    };

    it('Should initialize of controller', () => {
        expect(controller).not.toBeUndefined();
    });

    it('Should update username', () => {
        user.username = 'Mike';
        expect(user.username).toEqual('Mike');
    });

    it('Should update email', () => {
        user.email = 'mike@test.com';
        expect(user.username).toEqual('mike@test.com');
    });
});

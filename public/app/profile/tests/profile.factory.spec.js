import angular from 'angular';

describe('profileService', () => {
    beforeEach(angular.mock.module('myApp.profile'));

    it('Should method existing', inject(profileService => {
        expect(profileService.update).toBeDefined();
    }));
});

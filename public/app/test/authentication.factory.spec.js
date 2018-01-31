

describe('typeService', () => {
    beforeEach(module('myApp'));

    it('Get data', inject(($httpBackend, $http) => {
        const vm = {};

        $http.post('http://localhost:8080/auth/login', {
            username: 'alex',
            password: '123456',
        })
            .success(data => {
                vm.valid = true;
                vm.response = data;
            });

        $httpBackend
            .when('POST', 'http://localhost:8080/auth/login')
            .respond(200, {
                id: 1,
                username: '123456',
            });

        $httpBackend.flush();

        expect(vm.valid).toBe(true);
        expect(vm.response).toEqual({
            id: 1,
            username: '123456',
        });
    }));
});

profileService.$inject = ['$http'];

function profileService($http) {
    const service = {
        update,
    };

    return service;

    function update(data) {
        return $http.put(`/api/v1/profile/${data.id}`, data);
    }
}

export default profileService;

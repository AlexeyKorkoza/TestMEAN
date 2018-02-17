placeService.$inject = ['$http'];

function placeService($http) {
    const service = {
        getAll,
        create,
        remove,
        update,
        getPlaceById,
    };

    return service;

    function getAll(query) {
        let config = {};
        if (query) {
            config.params = query;
        }
        return $http.get('/api/v1/places', config);
    }

    function create(data) {
        return $http.post('/api/v1/places/add', data);
    }

    function remove(id) {
        return $http.delete(`/api/v1/places/${id}`, { params: { id } });
    }

    function update(data, id) {
        return $http.put(`/api/v1/places/${id}`, data);
    }

    function getPlaceById(id) {
        return $http.get(`/api/v1/places/${id}`);
    }
}

export default placeService;

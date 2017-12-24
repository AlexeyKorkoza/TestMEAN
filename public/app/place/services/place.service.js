placeService.$inject = ['$http'];

function placeService($http) {

    const service = {
        getAll,
        create,
        remove,
        update,
        getPlaceById,
        getPlacesByType,
    };

    return service;

    function getAll() {
        return $http.get('/api/v1/places');
    }

    function create(data) {
        return $http.post('/api/v1/places/add', data);
    }

    function remove(id) {
        return $http.delete('/api/v1/places/' + id, {params: {id: id}});
    }

    function update(data, id) {
        return $http.put('/api/v1/places/' + id, data);
    }

    function getPlaceById(id) {
        return $http.get('/api/v1/places/' + id);
    }

    function getPlacesByType(id) {
        return $http.get('/api/v1/places/type/' + id);
    }
}

export default placeService;

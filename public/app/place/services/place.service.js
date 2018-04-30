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
        return $http.get('https://powerful-ocean-87208.herokuapp.com/api/v1/places', { params: query });
    }

    function create(data) {
        return $http.post('https://powerful-ocean-87208.herokuapp.com/api/v1/places/add', data);
    }

    function remove(id) {
        return $http.delete(`https://powerful-ocean-87208.herokuapp.com/api/v1/places/${id}`, { params: { id } });
    }

    function update(data, id) {
        return $http.put(`https://powerful-ocean-87208.herokuapp.com/api/v1/places/${id}`, data);
    }

    function getPlaceById(id) {
        return $http.get(`https://powerful-ocean-87208.herokuapp.com/api/v1/places/${id}`);
    }
}

export default placeService;

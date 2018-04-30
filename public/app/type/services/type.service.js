typeService.$inject = ['$http', 'Upload'];

function typeService($http, Upload) {
    const service = {
        getAll,
        create,
        update,
        remove,
        getTypeById,
    };

    return service;

    function getAll() {
        return $http.get('https://powerful-ocean-87208.herokuapp.com/api/v1/types');
    }

    function create(data, file) {
        return Upload.upload({
            url: '/api/v1/types/add',
            data: {
                file,
                data,
            },
        });
    }

    function update(id, data, file) {
        return Upload.upload({
            url: `https://powerful-ocean-87208.herokuapp.com/api/v1/types/${id}`,
            method: 'PUT',
            data: {
                file,
                data,
            },
        });
    }

    function remove(id) {
        return $http.delete(`https://powerful-ocean-87208.herokuapp.com/api/v1/types/${id}`, { params: { id } });
    }

    function getTypeById(id) {
        return $http.get(`https://powerful-ocean-87208.herokuapp.com/api/v1/types/${id}`);
    }
}

export default typeService;

'use strict';

angular
    .module("myApp")
    .factory("profileService", profileService);

profileService.$inject = ['$http'];

function profileService($http){

    const service = {
        get,
        update
    };

    return service;

    function get(id) {
        const headers = {};
        headers.authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null;
        return $http.get("/api/v1/profile/" + id, { headers: headers });
    }

    function update(data) {
        const headers = {};
        headers.authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null;
        return $http.put("/api/v1/profile/" + data.id, data, { headers: headers });
    }

}
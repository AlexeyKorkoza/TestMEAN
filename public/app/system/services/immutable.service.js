'use strict';

angular
    .module('myApp')
    .factory('immutableService', immutableService);

immutableService.$inject = [];

function immutableService() {

    const service = {
        buildProfile,
        updateProfile,
    };

    return service;

    function buildProfile() {
        const user = window.user;
        const a = {
            id: window.user._id,
            username: window.user.username,
            email: window.user.email,
            date: window.user.date
        };
        return Immutable.Map(a);
    }

    function updateProfile(user) {
        window.user.username = user.username;
        window.user.email = user.email;
        window.user.date = user.date;
        buildProfile();
    }

}
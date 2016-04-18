(function () {
    "use strict";
    angular.module('app')
        .service("User", function (LocalStorage) {
            var self = this;
            var user = null;
            this.setUser = function (_user) {
                user = _user;
            };
            this.getUser = function () {
                return user;
            };
            this.setToken = function (token) {
                LocalStorage.set('token', token)
            };
            this.getToken = function () {
                return LocalStorage.get('token')
            };
            this.removeUser = function (user) {
                user = null;
                LocalStorage.remove('token');
            };
        })

})();
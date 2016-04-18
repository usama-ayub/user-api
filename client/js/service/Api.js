(function () {
    "use strict";
    angular.module('app')
        .service("Api", function (basedUrl, $http, $q, User) {
            var self = this;
            this.login = function (user) {
                return $q(function (reslove, reject) {
                    return $http.post(basedUrl + "/api/login", user)
                        .then(function (res) {
                            var data = res.data;
                            User.setToken(data.token);
                            User.setUser(data.user);
                            reslove();
                        }).catch(handleError)
                })
            };
            this.register = function (user) {
                return $q(function (reslove, reject) {
                    return $http.post(basedUrl + "/api/register", user)
                        .then(function (res) {
                            var data = res.data;
                            User.setToken(data.token);
                            User.setUser(data.user);
                            reslove()
                        }).catch(handleError)
                })
            };

            function handleError(err) {
                reject(err.data && err.data.msg || 'Unknown server error')
            }
        })

})();
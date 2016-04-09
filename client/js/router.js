angular.module('app')
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "templates/login.html"
        })
        .state('register', {
            url: "/register",
            templateUrl: "templates/register.html"
        });
    $urlRouterProvider.otherwise("/login");

});
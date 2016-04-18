angular.module('app')
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: "/",
            templateUrl: "templates/home.html",
            controller: "loginCtrl"
        })
        .state('login', {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "loginCtrl",
            controllerAs: "login"
        })
        .state('register', {
            url: "/register",
            templateUrl: "templates/register.html",
            controller: "registerCtrl",
            controllerAs: "register"

        });
    $urlRouterProvider.otherwise("/login");

});
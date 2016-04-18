(function(){
    "use strict";
    angular.module('app',['ui.router' , 'ngMaterial'])
        .constant("basedUrl","http://localhost:8080")
        .run(function ($rootScope,$state) {
            $rootScope.logout = function() {
                localStorage.removeItem('token');
                $state.go('login')
            }
        })
})();
0
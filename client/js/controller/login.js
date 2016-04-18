(function () {
    "use strict";
    angular.module('app')
        .controller("loginCtrl",function(Api,$state){
            var self = this;
            this.user = {};
            this.submit = function(){
                console.log(self.user);
                Api.login(self.user)
                    .then(function (data) {
                        console.log(data);
                        $state.go('app')
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            };
        })
})();
(function () {
    "use strict";
    angular.module('app')
        .service("LocalStorage", function () {
            var self = this;
            /*Converts a JavaScript Object Notation (JSON) string into an object.*/
            this.get = function (key) {
                var result = localStorage.getItem(key);
                try {
                    result = JSON.parse(result)
                }
                catch (err) {

                }
                return result
            };
            /*Converts a JavaScript value to a JavaScript Object Notation (JSON) string.*/
            this.set = function (key, val) {
                if (typeof val == "object") {
                    val = JSON.stringify(val)
                }
                localStorage.setItem(key, val);
            };
            this.remove = function (key) {
                localStorage.removeItem(key);
            }

        })
})();
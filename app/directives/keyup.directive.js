/**
 * Created by Yash on 2/21/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .directive('enterOnKeyup', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.enterOnKeyup);
                        });

                        event.preventDefault();
                    }
                });
            };
        });
})();
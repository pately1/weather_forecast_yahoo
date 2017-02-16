/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('WeatherCtrl', ['$scope', 'cityService', function ($scope, cityService) {

            $scope.text = cityService.text;

            $scope.$watch('text', function(){
                $scope.text.length == 0 ? $scope.flag = true : $scope.flag = false;
                cityService.text = $scope.text;
            });

        }]);
})();
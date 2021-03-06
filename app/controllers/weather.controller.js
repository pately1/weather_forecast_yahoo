/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('WeatherCtrl', ['$scope', 'cityService', '$location', function ($scope, cityService, $location) {

            $scope.text = cityService.text;

            $scope.$watch('text', function(){
                $scope.text.length == 0 ? $scope.flag = true : $scope.flag = false;
                cityService.text = $scope.text;
            });
            $scope.go = function () {
              $location.path('/forecast');
            };

        }]);
})();
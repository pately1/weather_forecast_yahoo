/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('WeatherCtrl', ['$scope', 'cityService', function ($scope, cityService) {
            $scope.zip = cityService.zip;
            $scope.$watch('zip', function(){
                if ($scope.zip.length == 5) {
                    $scope.flag = false;
                }
                else {
                    $scope.flag = true;
                }
                cityService.zip = $scope.zip;
            });

        }]);
})();
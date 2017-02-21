/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('ForecastCtrl', ['$scope', 'cityService','$http', 'forecastService', function ($scope, cityService, $http, forecastService) {

            $scope.isToggle = false;
            $scope.toggle = function () {
              $scope.isToggle = !$scope.isToggle;
            };
            $scope.flag = true;

            $scope.back = function () {
              cityService.text = '';
            };

            forecastService.getData().then(function (data) {
                    $scope.flag = false;

                    if (data.query.results == null) {
                        $scope.flag = true;
                    }

                    $scope.result = data.query.results.channel;
                    var condition = $scope.result.item.condition;
                    // Extracting Information
                    $scope.currentWeather = condition.text;
                    $scope.currentTemp = condition.temp;
                    $scope.todayHigh = $scope.result.item.forecast[0].high;
                    $scope.todayLow = $scope.result.item.forecast[0].low;
                    $scope.wind = $scope.result.wind.speed;
                    $scope.humidity = $scope.result.atmosphere.humidity;
                    $scope.pressure = $scope.result.atmosphere.pressure;
                    $scope.sunrise = $scope.result.astronomy.sunrise;
                    $scope.sunset = $scope.result.astronomy.sunset;
                    // JSON object Manipulation using jsonQ library
                    var info = jsonQ($scope.result);
                    $scope.days = (info.find('forecast').find('day').value()).slice(0, 7);
                    var highs = (info.find('forecast').find('high').value()).slice(0, 7);
                    var lows = (info.find('forecast').find('low').value()).slice(0, 7);
                    var text = (info.find('forecast').find('text').value()).slice(0, 7);
                    // Data that is passed to the graph
                    $scope.high_low = [ highs, lows ];
                    $scope.series = ['High', 'Low'];
            }, function (error) {
                console.log(error);
            });
        }]);
})();
/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('ForecastCtrl', ['$scope', 'cityService','$http', function ($scope, cityService, $http) {

            $scope.text = cityService.text;
            $scope.isToggle = false;
            $scope.toggle = function () {
              $scope.isToggle = !$scope.isToggle;
            };
            $scope.flag = true;

            $scope.back = function () {
              cityService.text = '';
            };

            // URL building to call API
            var text = cityService.text,
                baseUrl = 'https://query.yahooapis.com/v1/public/yql?q=',
                query = 'select * from weather.forecast where woeid in(select woeid from geo.places(1) where text="'+ text + '")',
                encodedQuery = encodeURIComponent(query),
                params = {
                    format: 'json',
                    env: 'store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                    callback: 'JSON_CALLBACK'
                };

            // API Call to the API
            $http({
                method: 'JSONP',
                url: baseUrl + encodedQuery,
                params: params
            }).then(function (data) {
                $scope.flag = false;
                $scope.result = data.data.query.results.channel;
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
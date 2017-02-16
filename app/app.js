/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';
    angular
        .module("WeatherApp", ['ngRoute', 'chart.js', 'angularSpinkit'])
        .config(['$routeProvider', function ($routeProvider) {
            // Configuring Routing for the Application
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.view.html',
                    controller: 'WeatherCtrl'
                })
                .when('/forecast', {
                    templateUrl: 'views/forecast.view.html',
                    controller: 'ForecastCtrl'
                });
        }])
        .config(['ChartJsProvider', function (ChartJsProvider) {
            // Configuration for the chart
            ChartJsProvider.setOptions({
                chartColors: ['#FF5252', '#FF8A80'],
                responsive: true
            });
        }]);
})();

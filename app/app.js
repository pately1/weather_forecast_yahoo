/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';
    angular
        .module("WeatherApp", ['ngRoute', 'ngResource', 'chart.js'])
        .config(['$routeProvider', function ($routeProvider) {
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
            ChartJsProvider.setOptions({
                chartColors: ['#FF5252', '#FF8A80'],
                responsive: true,
                tooltipTemplate: "<%= value %>"
            })
        }]);
})();

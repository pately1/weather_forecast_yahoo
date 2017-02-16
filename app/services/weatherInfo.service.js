/**
 * Created by Yash on 2/15/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .service('weatherInfo', ['$http', '$q', 'cityService', function ($http, $q, cityService) {
            var zip = cityService.zip,
            baseUrl = 'https://query.yahooapis.com/v1/public/yql?q=',
            query = 'select * from weather.forecast where woeid in(select woeid from geo.places(1) where text="'+ zip + '")',
            encodedQuery = encodeURIComponent(query),
            params = {
              format: 'json',
                env: 'store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                callback: 'JSON_CALLBACK'
            };
            console.log(zip);
                this.getData = function (zip) {
                    return $http({
                        method: 'JSONP',
                        url: baseUrl + encodedQuery,
                        params: params
                    }).success(function (response) {
                        return $q.resolve(response);
                    }).error(function (error) {
                        return $q.reject(error);
                    });
            }
        }]);
})();
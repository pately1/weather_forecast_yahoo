/**
 * Created by Yash on 2/21/2017.
 */
(function () {
    'use strict';

    angular
        .module('WeatherApp')
        .service('forecastService',['cityService', '$http','$q', function (cityService, $http, $q) {
            this.getData = function () {
                var baseUrl = 'https://query.yahooapis.com/v1/public/yql?q=',
                    query = 'select * from weather.forecast where woeid in(select woeid from geo.places(1) where text="'+ cityService.text + '")',
                    encodedQuery = encodeURIComponent(query),
                    params = {
                        format: 'json',
                        env: 'store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                        callback: 'JSON_CALLBACK'
                    };
               return $http({
                    method: 'JSONP',
                    url: baseUrl + encodedQuery,
                    params: params
                }).then(function (response) {
                    return $q.resolve(response.data);
                }, function (error) {
                   return $q.reject(error);
               });
            }
        }]);
})();
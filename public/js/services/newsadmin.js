'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').service('Newsadmin', ['$http', function ($http) {

    this.findNotApproved = function (success) {
        $http({method: 'GET', url: 'news/approveitems'}).
            //success(function (data, status, headers, config) {
            success(function (data) {
                success(data);
            });
    };

    this.approve = function (success) {
        $http({method: 'GET', url: 'news/approve'}).
            //success(function (data, status, headers, config) {
            success(function (data) {
                success(data);
            });
    };


    this.categories = function (success) {
        $http({method: 'GET', url: 'categories/all'}).
            success(function (data) {
                success(data);
            });
    };


}]);
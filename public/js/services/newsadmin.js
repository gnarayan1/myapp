'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').service('Newsadmin', ['$http', function ($http) {


    this.categories = function (success) {
        $http({method: 'GET', url: 'categories/all'}).
            success(function (data) {
                success(data);
            });
    };


}]);
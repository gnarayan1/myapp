'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').service('Articlesadmin', ['$http', function ($http) {

    this.findNotApproved = function (success) {
        $http({method: 'GET', url: 'articles/approve'}).
            success(function (data, status, headers, config) {
                success(data);
            });
    };


}]);
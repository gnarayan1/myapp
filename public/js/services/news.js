'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').factory('News', ['$resource', function ($resource) {

    return $resource('news/:newsId', {
        newsId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });


}]);
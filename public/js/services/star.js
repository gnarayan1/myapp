'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').factory('Star', ['$resource', function ($resource) {

    return $resource('star/:starId', {
        starId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });


}]);
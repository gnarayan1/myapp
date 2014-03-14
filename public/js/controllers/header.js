'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [
        {
            'title': 'Topics',
            'link': 'articles'
        },
        {
            'title': 'Create New Topic',
            'link': 'articles/create'
        }
    ];

    $scope.isCollapsed = false;
}]);
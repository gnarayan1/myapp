'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: 'views/articles/list.html'
            }).
            when('/articles/create', {
                templateUrl: 'views/articles/create.html'
            }).
            when('/articles/approvelist', {
                templateUrl: 'views/articles/approvelist.html'
            }).
            when('/articles/:articleId/edit', {
                templateUrl: 'views/articles/edit.html'
            }).
            when('/articles/:articleId', {
                templateUrl: 'views/articles/view.html'
            }).
            when('/', {
                templateUrl: 'views/index.html'
            }).when('/news', {
                templateUrl: 'views/news/list.html'
            }).
            when('/news/create', {
                templateUrl: 'views/news/create.html'
            }).
            when('/news/:newsId/edit', {
                templateUrl: 'views/news/edit.html'
            }).
            when('/news/:newsId', {
                templateUrl: 'views/news/view.html'
            }).when('/star', {
                templateUrl: 'views/star/list.html'
            }).
            when('/star/create', {
                templateUrl: 'views/star/create.html'
            }).
            when('/star/:starId/edit', {
                templateUrl: 'views/star/edit.html'
            }).
            when('/star/:starId', {
                templateUrl: 'views/star/view.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
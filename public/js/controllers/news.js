'use strict';

angular.module('mean.articles').controller('NewsController', ['$scope', '$routeParams', '$location', 'Global', 'News', 'Newsadmin', function ($scope, $routeParams, $location, Global, News, Newsadmin) {
    $scope.global = Global;

    $scope.clicked = false;

    $scope.categories = Global.categories;
    $scope.category = $scope.categories[0];

    $scope.create = function () {
        var news = new News({
            title: this.title,
            content: this.content,
            category: this.category
        });
        news.$save(function (response) {
            $location.path('news/' + response._id);
        });

        this.title = '';
        this.content = '';
        this.category = '';
    };

    $scope.remove = function (news) {
        if (news) {
            news.$remove();

            for (var i in $scope.newsitems) {
                if ($scope.newsitems[i] === news) {
                    $scope.newsitems.splice(i, 1);
                }
            }
        }
        else {
            $scope.news.$remove();
            $location.path('news');
        }
    };


    $scope.removeFromList = function (newsId) {
        News.get({
            newsId: newsId
        }, function (news) {
            news.$remove();

            for (var i in $scope.newsitems) {
                if ($scope.newsitems[i]._id === news._id) {
                    $scope.newsitems.splice(i, 1);
                }
            }
        });

    };

    $scope.update = function () {
        $scope.clicked = false;

        if ($scope.newsform.$valid) {
            var news = $scope.news;
            if (!news.updated) {
                news.updated = [];
            }
            news.updated.push(new Date().getTime());

            news.$update(function () {
                $location.path('news/' + news._id);
            });
        } else {
            $scope.clicked = true;
        }
    };

    $scope.find = function () {
        News.query(function (news) {
            $scope.newsitems = news;
        });
    };




    $scope.findOne = function () {
        News.get({
            newsId: $routeParams.newsId
        }, function (news) {
            $scope.news = news;
        });
    };


}]);
'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Global', 'Articles', 'Articlesadmin', function ($scope, $routeParams, $location, Global, Articles, Articlesadmin) {
    $scope.global = Global;

    $scope.create = function () {
        var article = new Articles({
            title: this.title,
            content: this.content
        });
        article.$save(function (response) {
            $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function (article) {
        if (article) {
            article.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };


    $scope.removeFromList = function (articleId) {
        Articles.get({
            articleId: articleId
        }, function (article) {
            article.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i]._id === article._id) {
                    $scope.articles.splice(i, 1);
                }
            }
        });

    };

    $scope.update = function () {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function () {
            $location.path('articles/' + article._id);
        });
    };

    $scope.find = function () {
        Articles.query(function (articles) {
            $scope.articles = articles;
        });
    };


    $scope.findNotApproved = function () {
        $scope.articles = Articlesadmin.findNotApproved(function (articles) {
            $scope.articles = articles;
        });
    };


    $scope.findOne = function () {
        Articles.get({
            articleId: $routeParams.articleId
        }, function (article) {
            $scope.article = article;
        });
    };


    $scope.approve = function (articleId) {
        alert('appriving '+articleId);
        Articles.get({
            articleId: articleId
        }, function (article) {
            article.approved = true;
            article.$update(function () {
                for (var i in $scope.articles) {
                    if ($scope.articles[i]._id === article._id) {
                        $scope.articles.splice(i, 1);
                    }
                }
                $location.path('articles/approvelist');
            });

        });
    };
}]);
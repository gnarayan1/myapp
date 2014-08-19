'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Global', 'Articles', 'Articlesadmin', function ($scope, $routeParams, $location, Global, Articles, Articlesadmin) {
    $scope.global = Global;

    $scope.clicked = false;

    $scope.intervalInMillis = 86400 * 1000 * 5; // 5 days in millis

    $scope.categories = Global.categories;

    function parseISO8601(str) {
        // we assume str is a UTC date ending in 'Z'

        var parts = str.split('T'),
            dateParts = parts[0].split('-'),
            timeParts = parts[1].split('Z'),
            timeSubParts = timeParts[0].split(':'),
            timeSecParts = timeSubParts[2].split('.'),
            timeHours = Number(timeSubParts[0]),
            _date = new Date;

        _date.setUTCFullYear(Number(dateParts[0]));
        _date.setUTCMonth(Number(dateParts[1]) - 1);
        _date.setUTCDate(Number(dateParts[2]));
        _date.setUTCHours(Number(timeHours));
        _date.setUTCMinutes(Number(timeSubParts[1]));
        _date.setUTCSeconds(Number(timeSecParts[0]));
        if (timeSecParts[1]) _date.setUTCMilliseconds(Number(timeSecParts[1]));

        // by using setUTC methods the date has already been converted to local time(?)
        return _date;
    }

    $scope.getInterval = function (createDate) {

        var createPlus5 = parseISO8601(createDate).getMilliseconds() + $scope.intervalInMillis;
        var currDateinMillis = (new Date()).getMilliseconds();
        var diff = createPlus5 - currDateinMillis;
        //console.log(diff);
        return diff / 1000;
    }

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
        $scope.clicked = false;

        if ($scope.articleform.$valid) {
            var article = $scope.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function () {
                $location.path('articles/' + article._id);
            });
        } else {
            $scope.clicked = true;
        }
    };

    $scope.find = function () {
        Articles.query(function (articles) {
            $scope.articles = articles;
        });
    };


    $scope.findNotApproved = function () {
        $scope.selCategory = $scope.categories[0];
        $scope.articles = Articlesadmin.findNotApproved(function (articles) {
            $scope.articles = articles;
        });
        //$scope.categories =
    };


    $scope.findOne = function () {
        Articles.get({
            articleId: $routeParams.articleId
        }, function (article) {
            $scope.article = article;
        });
    };


    $scope.approve = function (articleId, selCategory) {
        Articles.get({
            articleId: articleId
        }, function (article) {
            article.approved = true;
            article.category = selCategory;
            article.approvedate = new Date().getTime();
            article.$update(function () {
                for (var i in $scope.articles) {
                    if ($scope.articles[i]._id === article._id) {
                        $scope.articles.splice(i, 1);
                    }
                }
                $location.path('articles/approvelist');
            });

        });
        $scope.selCategory = $scope.categories[0];
    };
}]);
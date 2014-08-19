'use strict';

angular.module('mean.articles').controller('NewsController', ['$scope', '$routeParams', '$location', 'Global', 'News', 'Newsadmin', function ($scope, $routeParams, $location, Global, News, Newsadmin) {
    $scope.global = Global;

    $scope.clicked = false;

    $scope.intervalInMillis = 86400 * 1000 * 5; // 5 days in millis

    $scope.categories = ['Staffing/HR', 'Organizational', 'Performance/Goals', 'Idea/Food for thought', 'Technology', 'Customer Concerns'  ];

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
        var news = new News({
            title: this.title,
            content: this.content
        });
        news.$save(function (response) {
            $location.path('news/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function (news) {
        if (news) {
            news.$remove();

            for (var i in $scope.news) {
                if ($scope.news[i] === news) {
                    $scope.news.splice(i, 1);
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

            for (var i in $scope.news) {
                if ($scope.news[i]._id === news._id) {
                    $scope.news.splice(i, 1);
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
            $scope.news = news;
        });
    };


    $scope.findNotApproved = function () {
        $scope.selCategory = $scope.categories[0];
        $scope.news = Newsadmin.findNotApproved(function (news) {
            $scope.news = news;
        });
        //$scope.categories =
    };


    $scope.findOne = function () {
        News.get({
            newsId: $routeParams.newsId
        }, function (news) {
            $scope.news = news;
        });
    };


    $scope.approve = function (newsId, selCategory) {
        News.get({
            newsId: newsId
        }, function (news) {
            news.approved = true;
            news.category = selCategory;
            news.approvedate = new Date().getTime();
            news.$update(function () {
                for (var i in $scope.news) {
                    if ($scope.news[i]._id === news._id) {
                        $scope.news.splice(i, 1);
                    }
                }
                $location.path('news/approvelist');
            });

        });
        $scope.selCategory = $scope.categories[0];
    };
}]);
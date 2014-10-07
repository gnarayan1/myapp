'use strict';

angular.module('mean.articles').controller('StarController', ['$scope', '$routeParams', '$location', 'Global', 'Star', 'Staradmin', function ($scope, $routeParams, $location, Global, Star, Staradmin) {
    $scope.global = Global;

    $scope.clicked = false;


    $scope.create = function () {
        var star = new Star({
            title: this.title,
            content: this.content
        });
        star.$save(function (response) {
            $location.path('star/' + response._id);
        });

        this.title = '';
        this.content = '';

    };

    $scope.remove = function (star) {
        if (star) {
            star.$remove();

            for (var i in $scope.staritems) {
                if ($scope.staritems[i] === star) {
                    $scope.staritems.splice(i, 1);
                }
            }
        }
        else {
            $scope.star.$remove();

        }
        $location.path('star');
    };


    $scope.removeFromList = function (starId) {
        Star.get({
            starId: starId
        }, function (star) {
            star.$remove();

            for (var i in $scope.staritems) {
                if ($scope.staritems[i]._id === star._id) {
                    $scope.staritems.splice(i, 1);
                }
            }
        });

    };

    $scope.update = function () {
        $scope.clicked = false;

        if ($scope.starform.$valid) {
            var star = $scope.star;
            if (!star.updated) {
                star.updated = [];
            }
            star.updated.push(new Date().getTime());

            star.$update(function () {
                $location.path('star/' + star._id);
            });
        } else {
            $scope.clicked = true;
        }
    };

    $scope.find = function () {
        Star.query(function (star) {
            $scope.staritems = star;
        });
    };




    $scope.findOne = function () {
        Star.get({
            starId: $routeParams.starId
        }, function (star) {
            $scope.star = star;
        });
    };


}]);
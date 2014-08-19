'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', [
    function () {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !!window.user,
            categories: ['Staffing/HR', 'Organizational', 'Performance/Goals', 'Idea/Food for thought', 'Technology', 'Customer Concerns'  ]
        };

        return _this._data;
    }
]);

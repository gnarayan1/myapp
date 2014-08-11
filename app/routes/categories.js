'use strict';

// Categories routes use categories controller
var categories = require('../controllers/categories');

module.exports = function (app) {
    app.get('/categories', categories.all);
};
'use strict';

// Articles routes use articles controller
var star = require('../controllers/star');
var authorization = require('./middlewares/authorization');

/*
// Star authorization helpers
var hasAuthorization = function (req, res, next) {
    if (chkNotUsersStar(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};
*/

var chkNotUsersStar = function (req) {
    return typeof req.user === 'undefined' || typeof req.star.user === 'undefined' || req.star.user.id !== req.user.id;
};


var chkNotAdmin = function (req) {
    return req.user && (req.user.admin !== true);
};

var isAdmin = function (req, res, next) {
    if (chkNotAdmin(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

var isAdminOrAuthorized = function (req, res, next) {
    if (chkNotAdmin(req) && chkNotUsersStar(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function (app) {

    //app.get('/articles', articles.all);
    app.get('/star', star.all);

    //app.post('/articles', authorization.requiresLogin, articles.create);
    app.post('/star', star.create);
    app.get('/star/:starId', star.show);
    app.put('/star/:starId', authorization.requiresLogin, isAdminOrAuthorized, star.update);
    app.del('/star/:starId', authorization.requiresLogin, isAdminOrAuthorized, star.destroy);

    // Finish with setting up the starId param
    app.param('starId', star.star);

};
'use strict';

// Articles routes use articles controller
var news = require('../controllers/news');
var authorization = require('./middlewares/authorization');

/*
// News authorization helpers
var hasAuthorization = function (req, res, next) {
    if (chkNotUsersNews(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};
*/

var chkNotUsersNews = function (req) {
    return typeof req.user === 'undefined' || typeof req.news.user === 'undefined' || req.news.user.id !== req.user.id;
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
    if (chkNotAdmin(req) && chkNotUsersNews(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function (app) {

    //app.get('/articles', articles.all);
    app.get('/news', news.all);
    app.get('/news/approveitems', isAdmin, news.approvelist);
    //app.post('/articles', authorization.requiresLogin, articles.create);
    app.post('/news', news.create);
    app.get('/news/:newsId', news.show);
    app.put('/news/:newsId', authorization.requiresLogin, isAdminOrAuthorized, news.update);
    app.del('/news/:newsId', authorization.requiresLogin, isAdminOrAuthorized, news.destroy);

    // Finish with setting up the newsId param
    app.param('newsId', news.news);

};
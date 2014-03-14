'use strict';

// Articles routes use articles controller
var articles = require('../controllers/articles');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function (req, res, next) {
    if (chkNotUsersArticle(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

var chkNotUsersArticle = function(req) {
    return typeof req.user === 'undefined' || typeof req.article.user === 'undefined' ||  req.article.user.id !== req.user.id;
};


var chkNotAdmin = function(req) {
    return req.user && (req.user.admin !== true);
};

var isAdmin = function (req, res, next) {
    if (chkNotAdmin(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

var isAdminOrAuthorized = function (req, res, next) {
    if (chkNotAdmin(req) && chkNotUsersArticle(req)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function (app) {

    //app.get('/articles', articles.all);
    app.get('/articles', articles.approved);
    app.get('/articles/approveitems', isAdmin, articles.approvelist);
    //app.post('/articles', authorization.requiresLogin, articles.create);
    app.post('/articles', articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', authorization.requiresLogin, isAdminOrAuthorized, articles.update);
    app.del('/articles/:articleId', authorization.requiresLogin, isAdminOrAuthorized, articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);

};
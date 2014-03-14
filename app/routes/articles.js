'use strict';

// Articles routes use articles controller
var articles = require('../controllers/articles');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function (req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

var isAdmin = function (req, res, next) {
    if (req.user && (req.user.admin !== true)) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function (app) {

    //app.get('/articles', articles.all);
    app.get('/articles', articles.approved);
    app.get('/articles/approve', isAdmin, articles.approve);
    //app.post('/articles', authorization.requiresLogin, articles.create);
    app.post('/articles', articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.update);
    app.del('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);

};
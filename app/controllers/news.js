'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    News = mongoose.model('News'),
    _ = require('lodash');


/**
 * Find news by id
 */
exports.news = function (req, res, next, id) {
    News.load(id, function (err, news) {
        if (err) return next(err);
        if (!news) return next(new Error('Failed to load news ' + id));
        req.news = news;
        next();
    });
};

/**
 * Create an news
 */
exports.create = function (req, res) {
    var news = new News(req.body);
    news.user = req.user;

    news.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                news: news
            });
        } else {
            res.jsonp(news);
        }
    });
};

/**
 * Update an news
 */
exports.update = function (req, res) {
    var news = req.news;

    news = _.extend(news, req.body);

    news.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                news: news
            });
        } else {
            res.jsonp(news);
        }
    });
};

/**
 * Delete an news
 */
exports.destroy = function (req, res) {
    var news = req.news;

    news.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                news: news
            });
        } else {
            res.jsonp(news);
        }
    });
};

/**
 * Show an news
 */
exports.show = function (req, res) {
    res.jsonp(req.news);
};

/**
 * List of Newss
 */
exports.all = function (req, res) {
    News.find().sort('-created').populate('user', 'name username').exec(function (err, newsitems) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(newsitems);
        }
    });
};


/**
 * List of Newss
 */
exports.approved = function (req, res) {
    News.find({ 'approved': true}).sort('-created').populate('user', 'name username').exec(function (err, newsitems) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(newsitems);
        }
    });
};


/**
 * List of Newss
 */
exports.approvelist = function (req, res) {
    News.find({ 'approved': false }).sort('-created').populate('user', 'name username').exec(function (err, newsitems) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(newsitems);
        }
    });
};


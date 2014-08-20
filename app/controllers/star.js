'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Star = mongoose.model('Star'),
    _ = require('lodash');


/**
 * Find star by id
 */
exports.star = function (req, res, next, id) {
    Star.load(id, function (err, star) {
        if (err) return next(err);
        if (!star) return next(new Error('Failed to load star ' + id));
        req.star = star;
        next();
    });
};

/**
 * Create an star
 */
exports.create = function (req, res) {
    var star = new Star(req.body);
    star.user = req.user;

    star.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                star: star
            });
        } else {
            res.jsonp(star);
        }
    });
};

/**
 * Update an star
 */
exports.update = function (req, res) {
    var star = req.star;

    star = _.extend(star, req.body);

    star.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                star: star
            });
        } else {
            res.jsonp(star);
        }
    });
};

/**
 * Delete an star
 */
exports.destroy = function (req, res) {
    var star = req.star;

    star.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                star: star
            });
        } else {
            res.jsonp(star);
        }
    });
};

/**
 * Show an star
 */
exports.show = function (req, res) {
    res.jsonp(req.star);
};

/**
 * List of Stars
 */
exports.all = function (req, res) {
    Star.find().sort('-created').populate('user', 'name username').exec(function (err, staritems) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(staritems);
        }
    });
};






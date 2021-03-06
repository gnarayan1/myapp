'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    approvedate: {
        type: Date,
        default: Date.now
    },
    answereddate: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    approved: {
        type: Boolean,
        default: false
    },
    answered: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: '',
        trim: true
    },
    answer: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function (title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);

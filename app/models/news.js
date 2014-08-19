'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * News Schema
 */
var NewsSchema = new Schema({
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
NewsSchema.path('title').validate(function (title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
NewsSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('News', NewsSchema);

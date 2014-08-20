'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Star Schema
 */
var StarSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    startype: {
        type: String,
        default: '',
        trim: true
    },
    names: { type : Array , "default" : [] },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
StarSchema.path('title').validate(function (title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
StarSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Star', StarSchema);

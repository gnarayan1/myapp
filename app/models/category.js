'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Category Schema
 */
var CategorySchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
CategorySchema.path('name').validate(function (title) {
    return name.length;
}, 'Name cannot be blank');


mongoose.model('Category', CategorySchema);

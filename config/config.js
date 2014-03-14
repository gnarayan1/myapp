'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash');
console.log("---------------ENV=" + process.env.NODE_ENV);

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {}
);

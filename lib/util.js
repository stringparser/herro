'use strict';

exports = module.exports = {};

// dependencies
//
exports.inherits = require('util').inherits;


// library dependencies
//
exports.npmize = require('./npmize');

// assorted
//
exports.formatStack = function formatStack(stack){
  return (
    exports.npmize(stack) + '\n--\n' +
    'cwd ' + process.cwd() + '\n' +
    'node-' + process.version + ' ' + new Date().toISOString()
  );
};

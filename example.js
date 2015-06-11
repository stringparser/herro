'use strict';

var util = require('./lib/util');

var pwd = process.cwd();
var stack = util.npmize(
  pwd + '/node_modules/mocha/folder/index.js\n' +
  pwd + '/node_modules/jshint/node_modules/lodash/index.js'
);

console.log('stack');
console.log(stack);

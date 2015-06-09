'use strict';

var Herror = require('./.');
var error = new Herror('something happened');
var stack = error.stack;
console.log(stack);

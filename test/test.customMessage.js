
var assert = require('better-assert');
var herro = require('../.');
var error;

process.stdout.write('CustomCtor messages ');

herro.set('my-ErrorCtor', function(error, stack){
  error.message = 'something ' + error.message;
});

var ErrorCtor = herro.get('my-ErrorCtor');

error = new ErrorCtor('went wrong');
assert(error.message === 'something went wrong');

error = new ErrorCtor('went wrong thus far');
assert(error.message === 'something went wrong thus far');

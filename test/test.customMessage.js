
var assert = require('better-assert');
var herro = require('../.');
var error;



herro.set('my-ErrorCtor', function(error, stack){
  error.message = 'ok: ' + error.message;
});

var ErrorCtor = herro.get('my-ErrorCtor');

error = new ErrorCtor('done');
process.stdout.write(error.message);
assert(error.message === 'ok: done');

error = new ErrorCtor('brilliant');
process.stdout.write(' ; '+error.message+' ');
assert(error.message === 'ok: brilliant');

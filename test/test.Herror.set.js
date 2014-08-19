
var assert = require('assert');
var herro = require('../.');


herro.set('my-errorClass', function(err){

  err.message = 'something ' + err.message;
  return err;
});

var e = new herro.get('my-errorClass', 'went wrong');

assert( e instanceof Error );
assert( Error.stackTraceLimit  === 10 );
assert( e.message === 'something went wrong');
assert(
  catcher(function(){
    return herro.set();
  }) instanceof Error
);


function catcher(fn){

  var ret;
  try {
    ret = fn();
  }
  catch( e ){
    return e;
  }

  return ret;
}

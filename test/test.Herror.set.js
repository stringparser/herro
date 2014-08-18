
var assert = require('assert');
var Herror = require('../.');


Herror.set('my-errorClass', function(err, after){

  if(after){
    err.message = 'something ' + err.message;
  }
  else {
    this.continue = true;
  }

  return err;
});

var e = new Herror.get('my-errorClass', 'went wrong');

assert( e instanceof Error );
assert( Error.stackTraceLimit  === 10 );
assert( e.message === 'something went wrong');
assert(
  catcher(function(){
    return Herror.set();
  }) instanceof Error
);


throw Herror.set('hello', 'something');


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


var assert = require('better-assert');
var Herror = require('../.');


Herror.set('my-errorClass', function(err, post){

  if(post){

    err.message = "something "+e.message;
    assert( err.message === 'something went wrong' );

  } else {

    assert( err.message === 'something' );
  }

  return err;
});

var e = new Herror.get('my-errorClass', 'went wrong');

assert( e instanceof Error, 'Herror#get returns an instance of Error' );

var assert = require('assert');
var Herror = require('../.');

Herror.set('hello', function(){
  return new Error();
});


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

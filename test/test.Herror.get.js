var assert = require('better-assert');
var Herror = require('../.');

Herror.set('hello', function(){
  return new Error();
});


console.log(Herror.get('hello'));


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


var herro = require('../.');

herro.set('hello', function(){
  var err = new Error();

  err.plugin = "hello world";
  return err;
});

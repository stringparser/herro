
var util = require('util');

function Herro(){

  if (!(this instanceof Herro)){
    throw new Error('Call Herro using new');
  }

  Error.call(this);
}
util.inherits(Herro, Error);

throw new Herro('Hello world');
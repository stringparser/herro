'use strict';

var util = require('./lib/util');


function Herror(message){
  if(!(this instanceof Herror)){
    return new Herror(message);
  }

  this.cwd = process.cwd();
  this.date = new Date().toISOString();
  this.engine = 'node-' + process.version;
  this.message = message;

  Error.captureStackTrace(this,  Herror);

  this.stack = 'cwd ' + this.cwd +
    '\n\n' + util.npmize(this.stack) +
    '\n\n' + this.engine + ' ' + this.date;
}
util.inherits(Herror, Error);

exports = module.exports = Herror;

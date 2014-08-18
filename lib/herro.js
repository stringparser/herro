
/*
 * Module dependencies
 */

var util = require('util');
var local = require('./local');
var utils = require('./utils');

var config = new require('./config')();

/*
 * Expose `Herror`
 */

exports = module.exports = Herror;

/*
 * The `Herror` constructor
 */

function Herror(message){

  if( !(this instanceof Error) ){
    throw new Herror(
      ' Call `Herror` using an error instance.'
    );
  }

  Error.call(this);

  this.message = message;

  if(this.stack !== void 0){

    capture(this, arguments);
    this.stack = format(this,
      humanize(this.stack)
    );
  }

  return this;
}
util.inherits(Herror, Error);

/**
 * `Herro#set`
 *  @param {String} or {Object} name
 *  @param {Function} handle
 *  @return this
 *
 *  @api private
 */

exports.set = function (name, handle){
  return config.set(name, handle);
};

/*
 *
 */

exports.get = function (name){

  var preset = config.get(name);

  var errorClass = function (/*arguments*/){

    var self = this;
    var limit = Error.stackTraceLimit;

    console.log('self = ', this);
    Error.stackTraceLimit = 0;
    preset = preset.call(config, self);

    if( !(preset instanceof Error) ){
      throw new Herror(
        'Herror#get(`'+name+'`) should return an Error instance.'
      );
    }

    Error.stackTraceLimit = limit;

    Object.keys(preset).forEach(function(key){
      self[key] = preset[key];
    });

    Herror.apply(self, arguments);

    return self;
  };
  util.inherits(errorClass, Herror);

  return errorClass;
};

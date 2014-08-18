
/*
 * Module dependencies
 */

var util = require('util');
var local = require('./local');
var utils = require('./utils');

var config = new require('./config')();
var humanize = utils.humanize;
var format = utils.format;

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

exports.get = function (name, message){

  var preset = config.get(name);

  var errorClass = function (/*arguments*/){

    var self = this, err, post = false;
    var limit = Error.stackTraceLimit;

    Error.stackTraceLimit = 0;
    err = preset.call(config, self, post);

    if( !(err instanceof Error) ){
      throw new Herror(
        'Herror#get(`'+name+'`) should return an Error instance.'
      );
    }

    Error.stackTraceLimit = limit;
    Herror.apply(self, arguments);

    Object.keys(preset).forEach(function(key){
      self[key] += err[key];
    });

    post = true;
    self = preset.call(config, self, post);

    if( !(err instanceof Error) ){
      throw new Herror(
        'Herror#get(`'+name+'`) should return an Error instance.'
      );
    }

    return self;
  };
  util.inherits(errorClass, Herror);

  /**
   * Start already from get
   */
  if( message === void 0 ){
    return errorClass;
  }
  else {
    return new errorClass(message);
  }

};

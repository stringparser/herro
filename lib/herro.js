
/*
 * Module dependencies
 */

var util = require('util');
var local = require('./local');
var utils = require('./utils');

var humanize = utils.humanize;
var captureStack = utils.captureStack;
var format = utils.format;
var merge = utils.merge;

/*
 * Expose `Herror`
 */

exports = module.exports = { };

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

  Object.defineProperties(this, {
    'message': {
      enumerable : false,
      value : message
    },
    'arch' : {
      enumerable : false,
      value : local.arch
    }
  });

  if(this.stack === void 0){
    captureStack(this, arguments);
  }

  return this;
}
util.inherits(Herror, Error);

exports.Herror = Herror;
/**
 * `Herro#set`
 *  @param {String} or {Object} name
 *  @param {Function} handle
 *  @return this
 *
 *  @api public
 */

var config;

exports.set = function (name, handle){

  if(config === void 0){
    config = new Config();
  }

  return config.set(name, handle);
};

/**
 * `Herro#get`
 *  @param {String} name
 *  @param {String} message
 *  @return errorClass or {herror}
 *
 *  @api public
 */

exports.get = function (name, message){

  if(name === void 0){
    return Herror;
  }

  var preset = config.get(name);

  var errorClass = function (message){

    var self = this;
    var limit = Error.stackTraceLimit;

    Error.stackTraceLimit = 0;
      var err = new Error(message);
    Error.stackTraceLimit = limit;

    err = preset(err);

    if( !(err instanceof Error) ){
      throw new Herror(
        ' herror#set(name, handle) should return an error instance.'
      );
    }

    self = Herror.call(err, err.message);

    return  self;
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

/**
 * `Config` constructor
 *  @param {String} or {Object} initName
 *  @param {Function} initHandle
 *  @return
 *     - config#set if arguments
       - config if no arguments
 *
 * @api private
 */

function Config(initName, initHandle){

  var config = {};

  /**
   * `Config#set`
   *  @param {String} or {Object} name
   *  @param {Function} handle
   *  @return this
   *
   *  @api private
   */

  this.set = function(name, handle){

    var keys = isConfig(name, handle);

    if( Object(name) === name ){

      isConfig(name).forEach(function(key){
        config[key] = name[key];
      });
    }
    else {
      config[name] = handle;
    }

    return this;
  };

  /**
   * `Config#get`
   *  @param {String} or {Array} name
   *  @return a copy of config(s)
   *
   *  @api private
   */

  this.get = function(name){

    var target, mix;

    if( Array.isArray(name) ){

      mix = {};
      name.forEach(function(key){
        merge(mix, config[key]);
      });

      target = mix;
      return target;

    } else if( typeof name === 'string' ){

        target = config[name];
        return target;
    }
    else {

      throw new Herror(
        'herro#get(name): name should be a `string` or an `array`.'
      );
    }
  };

  /**
   * Start already
   */
  if(arguments[0]){
    return this.set(initName, initHandle);
  } else {

    return this;
  }
}

/**
 * Check arguments on `Config#set`
 *
 * @param {String} or {Object} name
 * @param {Function} handle
 * @return
 *   - {Herror} if check not passed.
 *   - {Array} keys if name is {Object}
 *
 * @api private
 */

function isConfig(name, handle){

  var keys;

  if( Object(name) === name ){

    keys = Object.keys(name).filter(function(key){
      return typeof name[key] === 'function';
    });

    if(keys.length > 0){
      return keys;
    }
    else{

      throw new Herror(
        'herro#set(name, handle): ' +
        'if name is Object => values should be functions.'
      );
    }
  }

  if ( arguments.length !== 2 ) {

    throw new Herror(
       'herro#set(name, handle): needs two arguments'+
       '  - name a `string` or an `object`'+
       '  - handle a `function`'
    );

  } else if(typeof name !== 'string'){

    throw new Herror(
      'herro#set(name, handle): name should be a `string`'
    );

  } else if(typeof handle !== 'function'){

    throw new Herror(
      'herro#set(name, handle): handle \n should be a `function`'
    );
  }
}

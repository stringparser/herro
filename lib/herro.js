
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
 * Init ex
 */

exports = module.exports = { };

/*
 * Expose the flood function
 */
exports.everywhere = function(){
  utils.flood();
  return module.exports;
};

/*
 * Expose the `caputreStack` function
 * It captures and properly humanizes the stack.
 *
 * @param {Error} error
 * @param {Arguments} args
 *
 * returns an {Error} instance;
 */
exports.captureStack = function(error, args){
  return captureStack(error, args);
};

/*
 * The `Herror` constructor
 */

function Herror(message, preset){

  if( !(this instanceof Error) )
    throw new Herror(' Call `Herror` using an `Error` instance.');
  else
    global[this.name || 'Error'].call(this);

  preset = preset || function(){};

  var errorPreset = {};
  var orig = Error.prepareStackTrace;
  var limit = Error.stackTraceLimit;

  // ##
  preset(errorPreset);
  if( typeof errorPreset.limit === 'number' ){
    Error.stackTraceLimit = errorPreset.limit;
  }

  Error.captureStackTrace(this,  Herror);

  Error.prepareStackTrace = function(_, stack){
    return stack;
  };

  this.rawStack = this.stack;
  this.message = message;
  this.stack = format(this, humanize(this.stack));
  preset(this);

  // ##
  Error.stackTraceLimit = limit;

  Object.defineProperties(this, {
    message : {
      enumerable : false,
      configurable : true
    },
    stack : {
      enumerable : false,
      configurable : true
    },
    arch : {
      enumerable : true,
      configurable : true
    },
    rawStack : {
      configurable : false,
      enumerable : true
    }
  });

  Error.prepareStackTrace = orig;
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

var config = new Config();

exports.set = function(name, handle){
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

function get(name, message){

  if(name === void 0 || typeof name !== 'string')
    return Herror;

  var ErrorCtor = function (message){

    if( !(this instanceof Herror) ){
      throw new Herror(
        'herro#get: invoke your constructor `'+name+'` using new.'
      );
    }

    Error.call(this);
    Herror.call(this, message, config.get(name));

  };
  util.inherits(ErrorCtor, Herror);

  /**
   * Start already from get
   */
  return ErrorCtor;

}
exports.get = get;

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
    } else {

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

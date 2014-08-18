
/**
 * Module dependencies
 */
var Herror = require('./herro');

/**
 * Expose `Config`
 */

exports = module.exports = Config;

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
      'herro#set(name, handle): handle should be a `function`'
    );
  }
}


/*
 * jaredhanson's merge
 * https://github.com/jaredhanson/utils-merge
 */

function merge(a,b){

  if(a && b){
    for(var key in b){
      a[key] = b[key];
    }
  }
  return a;
}

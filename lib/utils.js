
/*
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');
var util = require('util');

var local = require('./local');


/*
 * Expose all the functions here
 */

exports = module.exports = {};

/*
 * `humanize` function
 *
 * @param {String} stack
 * @return {String} structured stack
 *
 * @api private
 */

function humanize(stack){

  var pack = {}, regex;

  if( !Array.isArray(stack) ){
    stack = stack.split(/\n[ ]+at[ ]+/);
  }

  stack = stack.join('\n   at  ');

  // no need to proceed
  if( stack.match(/\((.*node_modules.*)\)/) === null ){
    return stack;
  }

  stack.match(
    /\((.*node_modules.*)\)/g
  ).forEach(function(filename){

    var file;
    filename.replace(/node_modules.\w+(\-\w+|\.\w+|)/g,
      function($0,$1,$2){

        file = file ? file + path.sep + $0 : $0;

        if(!pack[file]){

          pack[file] = path.resolve( local.path, file, 'package.json' );
          pack[file] = JSON.parse( fs.readFileSync(pack[file]) );
          pack[file] = pack[file].name + '@' + pack[file].version;
        }

        return pack[file];
      }
    );
  });

  pack[local.path] = local.badge;
  regex = Object.keys(pack);

  if(regex.length > 1){
    regex = regex.sort().reverse().join('|');
  }

  return stack.replace(
    new RegExp(regex, 'g'),
    function($0){
      return pack[$0];
    }
  );
}
exports.humanize = humanize;

/*
 * `format` function
 *
 * @param {Error} error
 * @param {String} stack
 * @return {String} formatted stack
 *
 * @api private
 */

function format(error){

  error.stack = (
    ' <name>: <message> ' +
    '\n\n source: <source> ' +
    '\n -- \n start ' + humanize(error.stack) +
    '\n -- \n ' +
    '<arch>\n'
  ).replace(
    new RegExp(local.path, 'g'),
    local.badge
  ).replace(/.*@.*/g,
    function($0){
      return $0.replace(/^[ ]+\w+[ ]+/, '    >  ');
    }
  ).replace(/<(name|message|arch)>/g,
    function($0,$1,$2,$3){
      return error[$1];
    }
  ).replace('<source>',
    function($0, $1, $2){
      var match = $2.match(/\((.*@.*)\)/);

      if(match !== null){
        return match[1];
      }
      else {
        return $2.replace('\n\n source: <source>', '');
      }
    }
  );
}
exports.format = format;

/**
 * `flood` function
 * Formats every stack trace
 * Takes no parameter what so ever
 *
 */

function flood(){

  Error.prepareStackTrace = function(error, stack){

    Object.defineProperties(error, {
      message : {
        enumerable : false,
        configurable : true
      },
      arch : {
        enumerable : false,
        configurable : true
      }
    });
    return format(error,
      humanize(stack)
    );
  };
}

var env = process.env;
if( env.ERROR_FLOOD && !env.NO_FLAGS ){
  flood();
}

if(env.NODE_ENV === 'test' ) {
  flood();
  Error.stackTraceLimit = Infinity;
}

exports.flood = flood;


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
exports.merge =  merge;

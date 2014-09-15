
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

  if( stack === void 0 || stack === null )
    return null;
  if( !Array.isArray(stack) )
    stack = stack.split(/\n[ ]+at[ ]+/);

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

          try {
            pack[file] = path.resolve( local.path, file, 'package.json' );
          } catch(err){
            pack[file] = file;
            return file;
          }

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

var template = (
  ' <name>: <message>' +
  '\n\n source: <source>' +
  '\n -- \n start <stack>' +
  '\n -- \n ' +
  '<arch>\n'
);

function format(error, stack){


  return (
     template
     .replace('<stack>', stack)
     .replace('<arch>', local.arch )
     .replace( local.path , local.badge )
     .replace(/.*@.*/,
        function($0){
          return $0.replace(/^[ ]+\w+[ ]+/, '    >  ');
        })
     .replace(/\n.*(<source>).*\n/,
      function($0, $1, $2, $3){
        var match = $3.match(/\((.*@.*)\)/);
        if(match === null)
          return '';
        else
          return $0.replace(new RegExp($1, 'g'), match[0]);
      })
    .replace(/<(name|message)>/g,
      function($0,$1){
        return error[$1];
      })
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
        configurable : true,
        value : local.arch
      }
    });

    return format(
      error, humanize(stack)
    );
  };
}
exports.flood = flood;

var env = process.env;

if(env.NODE_ENV === 'test' ) {
  flood();
  Error.stackTraceLimit = Infinity;
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
exports.merge =  merge;

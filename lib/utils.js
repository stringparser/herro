'use strict';
/*
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');

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
      function($0){

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
  '\n <name> <message> \n'+
  '\n source: <start>'+
  '\n -- \n'+
  '<stack>'+
  '\n -- \n '+
  '<arch>\n'
);

function format(error, stack){

  if( stack.match(local.arch) ){
    return stack;
  }
  stack = stack.split('\n');
  var start = stack[0];
  stack = template
    .replace(/<(name|message)>/g,
     function($0,$1){
       return error[$1];
     })
    .replace('<stack>', stack.slice(1).join('\n') )
    .replace('<arch>', local.arch )
    .replace( new RegExp(local.path,'g'), local.badge );


  var match = start.replace(/\:\d+\:\d+$/, '');
              start.match(/.*@.*/);

  if(match){
    stack = stack.replace(new RegExp('.*'+match+'.*','g'),
     function($0){
       return $0.replace(/^[ ]+\w+[ ]+/, '    >  ');
     });
  }

  return stack.replace(/<start>/, start);

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

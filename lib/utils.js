
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

exports.humanize = function humanize(stack){

  // stop if no stack was provided
  if( stack === void 0 ){
    return '';
  }

  var pack = {}, regex;

  if( !Array.isArray(stack) ){
    stack = stack.split(/\n[ ]+at[ ]+/);
  }

  stack = stack.join('\n   at  ');

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
};

/*
 * `format` function
 *
 * @param {Error} error
 * @param {String} stack
 * @return {String} formatted stack
 *
 * @api private
 */

exports.format = function format(error, stack){

  return (
    ' <name>: <message> ' +
    '\n\n source: <source> ' +
    '\n -- \n start ' + stack +
    '\n -- \n ' +
    '<arch>\n'
  ).replace(/<(name|message|arch)>/g,
    function($0,$1){
      return error[$1];
    }
  ).replace(/.*@.*/,
    function($0){
      return $0.replace(/[ ]+\w+[ ]+/, '    >  ');
    }
  ).replace('<source>',
    function($0, $1, $2){
      return $2.match(/\((.*@.*)\)/)[1];
    }
  );
}

/**
 * `capture` function
 *
 * @param {Error} self, an instance error
 * @param {Arguments} args, an arguments object
 *
 */

function capture(self, args){

  Error.captureStackTrace( self,
    args.callee || self.constructor
  );
}

/**
 * `flood` function
 * Formats every stack trace
 * Takes no parameter what so ever
 *
 */

function flood(){

  Error.prepareStackTrace = function(error, stack){

    error.arch = local.arch;
    return format(error,
      humanize(stack)
    );
  };

  Error.stackTraceLimit = Infinity;
}

if( process.env.NO_FLAGS === void 0 ){

  if(process.env.FLOOD){
    flood();
  }
}


/*
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var util = require('util');
var local = require('./local');

/*
 *
 */

exports = module.exports = Herror;

/*
 *
 */

function Herror(){

  Error.call(this);

  capture(this, arguments);

  this.message = arguments[0];
  this.arch = local.arch;

  this.stack = humanize(this,
    format(this, this.stack)
  );
}
util.inherits(Herror, Error);

/*
 * Simple regexes to have a nice day
 */

function humanize(stack){

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
}

/*
 *
 */

function format(error, stack){

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

/*
 *
 */

exports.captureStackTrace = function capture(self, args){

  Error.captureStackTrace( self,
    args.callee || self.constructor
  );
};

/*
 *
 */

exports.everywhere = function(){

  Error.prepareStackTrace = function(error, stack){

    error.arch = local.arch;
    return format(error,
      humanize(stack)
    );
  };

  Error.stackTraceLimit = Infinity;

};


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

function Herror(){

  Error.call(this);

  capture(this, arguments);

  this.message = arguments[0];

  this.stack = humanize(
    format(this, this.stack)
  );
}
util.inherits(Herror, Error);

/*
 * Simple regexes to have a nice day
 */

var fileName = /\((.*node_modules.*)\)/;
var moduleName = /node_modules.\w+(\-\w+|\.\w+|)/g;
var sourceFormat = /\((.*@.*)\)/;


var map = {};

function humanize(stack){

  var pack = {}
  return stack.replace(fileName, function($0,$1){

    var file;

    return $1.replace(moduleName, function($0){
      file = file
        ? file + path.sep + $0
        : $0;

      if(!pack[file]){

        pack[file] = path.resolve('.',file,'package.json')
        pack[file] = JSON.parse( fs.readFileSync(pack[file]) );
        pack[file] = pack[file].name + '@' + pack[file].version;
      }

      return pack[file];
    })

  }).replace(local.regex, local.badge)
    .replace('<source>', function($0, $1, $2){
      return $2.match(/\((.*@.*)\)/)[1];
  });
}

/*
 *
 */

Herror.prototype.format = function format(error, stack){

  stack = Array.isArray(stack)
   ? stack
   : stack.split(/\n[ ]+at[ ]+/);

  return (
  ' ' + error.name + ': ' + error.message
      + '\n\n source: <source> '
      + '\n -- \n start  '
      + stack.join('\n    at  ')
      + '\n -- \n '
      + local.arch + '\n'
  );
}

/*
 *
 */

exports.captureStackTrace = function capture(self, args){

  Error.captureStackTrace(self, args.callee || self.constructor);
}

/*
 *
 */

exports.everywhere = function(){

  Error.prepareStackTrace = function(error, stack){

    return humanize( format(error, stack) );
  }

  Error.stackTraceLimit = Infinity;
}
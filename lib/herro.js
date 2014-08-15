
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

  var file = stack.match(fileName)[1];

  file.match(moduleName).map(function(name, index, names){

    return path.resolve.apply(null, names.slice(0, index+1));

  }).map(function(name, index, names){

    var relative = path.relative(local.path, name);

    if(map[relative] === void 0){

      var json = path.resolve(name,'package.json');
          json = fs.readFileSync(json);
          json = JSON.parse(json);

      map[relative] = json.name + '@' + json.version;
      if(index > 0) {
        var prev  = path.relative(local.path, names[index-1]);
            prev  = path.resolve(map[prev], map[relative]);

        map[relative] = path.relative(local.path, prev);
      }
    }

    return map[relative];
  });

  var regex = Object.keys(map).sort(function(a,b){
    return b.length - a.length;
  }).join('|');

  stack = stack.replace(new RegExp(regex, 'g'),
    function($0){ return map[$0]; }
  );

  file = stack.match(fileName);
  if(file !== null)
    humanize(stack);
  else {

    // We are done here
    // replace the missing badges
    stack = stack
      .replace(new RegExp(local.path,'g'), local.badge)
      .replace(/.*@.*/, function($0){
          return $0.replace(/\w+/, '    >');
      });

    return stack.replace('<source>', function(){
      return stack.match(/\((.*@.*)\)/)[1];
    });

  }
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
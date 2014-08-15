
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
  Error.captureStackTrace(this, this.constructor);

  this.message = arguments[0];

  this.stack = Array.isArray(this.stack)
   ? this.stack
   : this.stack.split(/\n[ ]+at[ ]+/)

  this.stack = this.stack.join('\n    at  ');

  this.stack = humanize(

    ' ' + this.name + ': ' + this.message
    + '\n\n source: <source> '
    + '\n -- \n start  '
    + this.stack
    + '\n -- \n '
    + local.node + '\n'

  ).replace(local.path, local.badge);
}
util.inherits(Herror, Error);


var fileName = /\((.*node_modules.*)\)/;
var moduleName = /node_modules.\w+(\-\w+|\.\w+|)/g;
var moduleFormat = /\w+(.\w+|-\w+|)@\d+(.\d+){2}/;
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
    return stack.replace(/.*@.*/, function($0){
                  return $0.replace(/\w+/, '    >');
                }).replace(local.path, local.badge);
  }
}

/*
 *
 */

exports.everywhere = function(){

  Error.prepareStackTrace = function(error, stack){

    return humanize(
      ' ' + error.name + ': ' + error.message
      + '\n -- \n start  '
      + stack.join('\n    at  ')
      + '\n -- \n '
      + local.arch + '\n'
    ).replace(new RegExp(local.path, 'g'), local.badge);
  }

  Error.stackTraceLimit = Infinity;
}
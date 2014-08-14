
var fs = require('fs');
var path = require('path');
var util = require('util');
var merge = require('utils-merge');

var local = {
  path : path.resolve('.')
};

merge(local, {
  module : require( path.resolve(local.path, 'package.json') ),
    node : 'node@' + process.versions.node,
   regex : new RegExp(local.path, 'g')
})
local.badge = local.module.name + '@' + local.module.version;

exports = module.exports = Herror;

function Herror(){

  Error.call(this);
  Error.captureStackTrace(this, this.constructor);

  this.message = arguments[0];

  this.stack = humanize(
      '  Start: <source> \n '
    + this.name + ': ' + this.message
    + '\n -- \n from: '
    + this.stack.replace(/.*\n[ ]+at[ ]+/, '')
    + '\n -- \n '
    + local.node + '\n'
  ).replace(local.regex, local.badge);
}
util.inherits(Herror, Error);


var fileName = /\((.*node_modules.*)\)/g;
var moduleName = /node_modules.\w+(\-\w+|\.\w+|)/g;
function humanize(stack){

  var source = '';
  var matches = 0;

  return stack.replace(fileName, function($0,$1){

    var pack = {}
    var file = '', prev, ret;

    ret = $1.replace(moduleName, function($0,$1,$2,$3){
      file = prev
        ? file + '/' + $0
        : $0;

      if(!pack[file]){
        pack[file] = JSON.parse(
          fs.readFileSync(
            path.resolve('./'+file,'package.json')
          )
        );

        pack[file] = pack[file].name + '@' + pack[file].version;

        prev = true;
        return pack[file];
      }
    })

    if(matches == 0){
      source = pack[$1.match(moduleName).join('/')];
    }

    matches++;
    return ret;
  }).replace('<source>', source);
}

/*
 *
 */

exports.everywhere = function(){

  Error.prepareStackTrace = function(error, stack){

    return humanize(
      ' ' + error.name + ': ' + error.message
      + '\n\n source: <source> '
      + '\n -- \n start  '
      + stack.join('\n    at  ')
             .replace(/[ ]+/, '\n     >  ')
      + '\n -- \n '
      + local.node + '\n'
    ).replace(local.regex, local.badge);
  }

  Error.stackTraceLimit = Infinity;
}
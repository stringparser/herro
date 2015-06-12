'use strict';

require('should');

var fs = require('fs');
var path = require('path');
var devDep = require('../package.json').devDependencies;

Object.keys(devDep).forEach(function(dep){
  devDep[dep] = require(path.join(dep, 'package.json'));
  Object.keys(devDep[dep].dependencies).forEach(function(child){
    devDep[dep][child] = require(
      path.join(dep, 'node_modules', child, 'package.json')
    );
  });
});

module.exports = {
  lib: require('../lib/util'),
  suite: function(){
    var first = [ ];

    return first.concat(
      fs.readdirSync(__dirname).filter(function(file){
        if(/^_/.test(file)){ return false; }
        return path.extname(file) && first.indexOf(file) < 0;
      })
    );
  },
  devDep: devDep
};

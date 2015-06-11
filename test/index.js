'use strict';

var cwd = process.cwd();

var path = require('path');
var util = require('../lib/util');
var Herror = require('../.');
var should = require('should');
var devDep = require('../package.json').devDependencies;

Object.keys(devDep).forEach(function(dep){
  devDep[dep] = require(path.join(dep, 'package.json'));

  Object.keys(devDep[dep].dependencies).forEach(function(child){
    devDep[dep][child] = require(
      path.join(dep, 'node_modules', child, 'package.json')
    );
  });
});

describe('herro', function(){
  should.exists(Herror);

  var description = 'CWD/node_modules/module/file.js ' +
   'into module@version';

  it(description, function(){
    util.npmize(
      path.join(cwd, 'node_modules', 'mocha', 'file.js')
    ).should.be.eql(
      path.join('mocha@' + devDep.mocha.version, 'file.js')
    );
  });

  description = 'CWD/node_modules/m1/node_modules/m2/file.js ' +
    'into m1@version/m2@version2';

  it(description, function(){
    util.npmize(
      path.join(
        cwd, 'node_modules', 'mocha',
        'node_modules', 'glob', 'file.js'
      )
    ).should.be.eql(
      path.join(
        'mocha@' + devDep.mocha.version,
        'glob@' + devDep.mocha.glob.version, 'file.js'
      )
    );
  });

});

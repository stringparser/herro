'use strict';

var path = require('path');
var should = require('should');

module.exports = function(herro, util){
  should.exist(util);

  var cwd = process.cwd();
  var description =
    'CWD/node_modules/module/file.js into module@version';

  it(description, function(){
    util.lib.npmize(
      path.join(cwd, 'node_modules', 'mocha', 'file.js')
    ).should.be.eql(
      path.join('mocha@' + util.devDep.mocha.version, 'file.js')
    );
  });

  description = 'CWD/node_modules/m1/node_modules/m2/file.js ' +
    'into m1@version/m2@version2';

  it(description, function(){
    util.lib.npmize(
      path.join(
        cwd, 'node_modules', 'mocha',
        'node_modules', 'glob', 'file.js'
      )
    ).should.be.eql(
      path.join(
        'mocha@' + util.devDep.mocha.version,
        'glob@' + util.devDep.mocha.glob.version, 'file.js'
      )
    );
  });
};

'use strict';

var should = require('should');

module.exports = function(herro, util){
  should.exist(util);

  it('global(truthy || undefined) npmizes stacks', function(){
    herro.global();
    var stack = new Error('ups I did it again').stack;
    var badge = 'mocha@' + util.devDep.mocha.version;
  });

  it('global(falsy) brings back default format', function(){
    herro.global(false);
    var stack = new Error('ups I did it again').stack;
    var badge = 'mocha@' + util.devDep.mocha.version;
    (stack.match(badge) === null).should.be.eql(true);
  });
};

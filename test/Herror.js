'use strict';

var should = require('should');

module.exports = function(herro, util){
  should.exist(util);

  it('should format stack traces', function(){
    var stack = new herro.Herror('hello there').stack;
    var badge = 'mocha@' + util.devDep.mocha.version;
    stack.match(badge)[0].should.be.eql(badge);
  });

  it('should have an ISO date string', function(){
    var stack = new herro.Herror('hello there').stack;
    var badge = new Date().toISOString().replace(/\..*$/, '');
    stack.match(badge)[0].should.be.eql(badge);
  });

  it('should have the current node version', function(){
    var stack = new herro.Herror('hello there').stack;
    var badge = 'node-' + process.version;
    stack.match(badge)[0].should.be.eql(badge);
  });

  it('should have the current working directory', function(){
    var stack = new herro.Herror('hello there').stack;
    var badge = process.cwd();
    stack.match(badge)[0].should.be.eql(badge);
  });
};

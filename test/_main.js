'use strict';

var path = require('path');
var packageName = require('../package').name;

var util = require('./_util');
var herro = require('../');

describe(packageName, function(){
  util.suite().forEach(function(file){
    var suite = path.basename(file, path.extname(file));
    describe(suite, function(){
      require('./'+file)(herro, util);
    });
  });
});

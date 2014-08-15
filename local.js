
/*
 * Module dependencies
 */

var path = require('path'),
    pack = require(path.resolve('.', 'package'));


exports = module.exports = {
  path : path.resolve('.'),
  arch : 'node@' + process.versions.node,
 badge : pack.name + '@' + pack.version
};

/*
 * Module dependencies
 */

var path = require('path'),
    localPath = path.resolve('.'),
    pack;

try {
  pack = require(path.resolve('.', 'package'));
} catch(e) {
  pack = null;
}


exports = module.exports = {
  path : new RegExp(localPath, 'g'),
  arch : 'node@' + process.versions.node,
 badge : pack !== null ? (pack.name + '@' + pack.version)
                       : path.relative('..', localPath)
};

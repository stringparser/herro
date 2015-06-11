'use strict';

var path = require('path');

/* @api private

## npmize
```
 function npmize(String stack)
```

Transforms a stack string with format 1. into format 2. using
package.json information of that package.

Formats:
  1. CWD/node_modules/<module1>/../node_modules/<module2>
  2. <module1>@<module1-version>/<module2>@<module2-version>

**/

function npmize(stack){
  var base, cwd = process.cwd();
  var moduleRE = /(.*?)node_modules(.)[^\/\\]+[\/\\]/g;

  return stack.replace(moduleRE, function($0, $1, $2){
    if($1){ $1 = path.relative(cwd, $1); base = $0; } else {
      base += $0;
    }
    var pack = require(path.join(base, 'package.json'));
    return $1 + pack.name + '@' + pack.version + $2;
  });
}

exports = module.exports = npmize;

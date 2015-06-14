'use strict';

var util = require('./lib/util');

exports = module.exports = {};

/*
### Herror
```js
function Herror(String message)
```
`Error` class with paths on its stack trace as `<module>@<version>`
instead of `node_modules/<module>`. Inherits from the Error class.

_arguments_
 - `message` type string message for the error

_returns_
 - a new `error` instance

#### usage
```js
var Herror = require('herro').Herror;

if('something broke'){
  throw new Herror('oh, no, you did not!');
}
```
*/

exports.Herror = function Herror(message){
  if(!(this instanceof Herror)){
    return new Herror(message);
  }

  this.message = message;
  Error.captureStackTrace(this,  Herror);
  this.stack = util.formatStack(this.stack);
};
util.inherits(exports.Herror, Error);

/*
### global
```js
function global(Boolean flag)
```

If `flag` is truthy or `undefined`, it will make all stack traces
have `<module>@<version>` instead of `node_modules/<module>`.

If `flag` is flasy it will revert stacktrace to their default format.

#### usage
```js
var herro = require('herro');

herro.global(); // make it global
herro.global(false); // go back to the normal stack format
```
*/

var prepare = Error.prepareStackTrace;

exports.global = function(flag){
  flag = flag === void 0 || Boolean(flag);
  if(flag === false){ return (Error.prepareStackTrace = prepare); }

  Error.prepareStackTrace = function(err, stack){
    return (
      'Error:' + err.message + '\n' +
      util.formatStack(stack.join('\n   at  '))
    );
  };
};

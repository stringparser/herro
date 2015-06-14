### herro! [<img alt="npm downloads" src="http://img.shields.io/npm/dm/herro.svg?style=flat-square" align="right"/>](http://img.shields.io/npm/dm/herro.svg)
[<img alt="build" src="http://img.shields.io/travis/stringparser/herro/master.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/herro/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/herro.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/herro)

What if stack traces looked like this?

```sh
Error: something broke
    at Context.<anonymous> (./test/Herror.js:9:17)
    at callFn (mocha@2.2.5/lib/runnable.js:266:21)
    at Test.Runnable.run (mocha@2.2.5/lib/runnable.js:259:7)
    at Runner.runTest (mocha@2.2.5/lib/runner.js:390:10)
    at mocha@2.2.5/lib/runner.js:473:12
    at next (mocha@2.2.5/lib/runner.js:315:14)
    at mocha@2.2.5/lib/runner.js:325:7
    at next (mocha@2.2.5/lib/runner.js:260:23)
    at Immediate._onImmediate (mocha@2.2.5/lib/runner.js:292:5)
    at processImmediate [as _immediateCallback] (timers.js:369:17)
--
cwd /Users/stringparser/code/herro
node-v1.5.0 2015-06-14T16:09:05.544Z
```
Changes paths that have
 - The current working directory with `.`
 - `node_modules/<module>` with `<module>@<version>`

Adds a footer with
 - An ISO date
 - The current working directory
 - The node version the `error` was thrown from

## api

The `module.exports` two functions

### Herror
```js
function Herror(String message)
```
`Error` class with a `<module>@<version>` formatted stack trace
 instead of `node_modules/module`. inherits from the Error class.

arguments
 - `message` type string message for the error

returns
 - a new `error` instance

#### usage
```js
var Herror = require('herro').Herror;

if('something broke'){
 throw new Herror('oh, no, you didn\'t!');
}
```

### global
```js
function global(Boolean flag)
```

If `flag` is truthy or `undefined`, it will make all stack traces
have `<module>@<version>` instead of `node_modules/<module>`.

If `flag` is flasy it will revert stack traces to their original
default format.

#### usage
```js
var herro = require('herro');

herro.global(); // make it global
herro.global(false); // go back to the normal stack format
```

## install

With [npm](https://www.npmjs.com)

```
npm install herro
```

## test

```
$ npm test
```

## license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/herro.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)

# herro! [![NPM version][badge-npm]][link-npm][![npm downloads][badge-donwloads]][link-npm]

[![Build][badge-build]][link-build]

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
 - The current working directory
 - An ISO date and node version from were `error` was thrown

## api
```js
var herro = require('herro');
```

The `module.exports` two functions
 - `herro.Herror`
 - `herro.global`

### Herror
```js
function Herror(String message)
```
`Error` class with paths on its stack trace as `<module>@<version>`
instead of `node_modules/<module>`. Inherits from the `Error` class.

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

### global
```js
function global([Boolean flag])
```

If `flag` is truthy or `undefined`, it will make all stack traces
have `<module>@<version>` instead of `node_modules/<module>`. If `flag` is falsy it will revert stacktraces to their default format.

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
herro (master) ✔ npm test

herro
  Herror
    ✓ should format stack traces
    ✓ should have an ISO date string
    ✓ should have the current node version
    ✓ should have the current working directory
  npmize
    ✓ CWD/node_modules/module/file.js into module@version
    ✓ CWD/node_modules/m1/node_modules/m2/file.js into m1@version/m2@version2
  global
    ✓ global(truthy || undefined) npmizes stacks
    ✓ global(falsy) brings back default format


8 passing (21ms)
```

## license

The MIT License (MIT)

Copyright (c) 2014-present Javier Carrillo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- links, etc -->

[link-npm]: http://www.npmjs.org/package/herro
[link-build]: https://travis-ci.org/stringparser/herro/builds

[badge-npm]: http://img.shields.io/npm/v/herro.svg?style=flat-square
[badge-build]: http://img.shields.io/travis/stringparser/herro/master.svg?style=flat-square
[badge-donwloads]: http://img.shields.io/npm/dm/herro.svg?style=flat-square

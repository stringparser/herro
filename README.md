#

[<img alt="npm downloads" src="http://img.shields.io/npm/dm/herro.svg?style=flat-square" align="right"/>](http://img.shields.io/npm/dm/herro.svg)
[<img alt="NPM version" src="http://img.shields.io/npm/v/herro.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/herro)
[<img alt="build" src="http://img.shields.io/travis/stringparser/herro/master.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/herro/builds)

## herro
> Humanize the `Error` class[<img alt="progressed.io" src="http://progressed.io/bar/75" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

The aim of this project is to humanize stack traces writing package's versions and names directly on the table.

## example

Say you have this stack.

[<img src="./docs/example_stack.png" align="center"/>](https://github.com/stringparser/runtime)

What if looked like this?

[<img src="./docs/example_stack2.png"  align="center"/>](https://github.com/stringparser/runtime)

 What it was done:
  - Change `node_modules/moduleName` with `moduleName@version`
  - Change `my-project-path` with `my-project-path@version`. That is, on the screenshot above you see [runtime@0.1.28-docs-2](https://github.com/stringparser/runtime) instead of `/home/jcm/code/herro`. If you want that changed [write](https://github.com/stringparser/herro/issues/new).
  - Add an `arch` badge at the bottom showing what node was running when that happened.
  - Add a `source` pointing to the first ocurrence of a `node_module` on the stack.

## install

```
npm install herro --save
```

## usage

Out of the package you get a plain old `Herror` class that only takes one argument (the message to be written).

```js
var Herror = require('herro').Herror;
```

Just use it as you normally would with `Error` and you'll get stack traces like above.

Also, if you want to enforce *any* `v8` stacktrace to have the package names and versions written there is a flag you can use for that

```sh
export ERROR_FLOOD=true node index.js
```

Besides of the simple `Herror` class there are two methods to easily customize your errors (see the [api](#api) section below).

```js
var herro = require('herro');

herro.set('my-custom-error', function(err){

  err.message = error.message + ' with orange juice please';
  return err;
});

var myErrorClass = herror.get('my-custom-error');

throw new myErrorClass('Excuse me dear, I would fancy coffee and toasts');
// or also
throw new herror.get('my-custom-error', 'Excuse me dear, I would fancy coffee and toasts')
```

which as you would guess will `throw`

```sh
throw new myErrorClass('Excuse me dear, I would fancy coffee and toasts')
      ^
 Error: Excuse me dear, I would fancy coffee and toasts with orange juice please

 source: herro@0.0.16/lib/herro.js:103:19
 --
    >  new errorClass (herro@0.0.16/lib/herro.js:103:19)
   at  Object.<anonymous> (herro@0.0.16/test/test.Herror.set.js:47:7)
   at  Module._compile (module.js:456:26)
   at  Object.Module._extensions..js (module.js:474:10)
   at  Module.load (module.js:356:32)
   at  Function.Module._load (module.js:312:12)
   at  Function.Module.runMain (module.js:497:10)
   at  startup (node.js:119:16)
   at  node.js:906:3
 --
 node@0.10.30
```

# api

## herro.Herror

Inherits from `Error` an error class with formatted stack trace. You can call it with and without `new`.

`Herror.call` or `apply` will expect you to use an `Error` instance for `this`.

That is:

```js
var herro = require('herro').Herror;
var myThing = {};

Herror.call(myThing)
Herror.apply(myTHing)

// Both above will throw an error
```

## herro.set(name, handle)

Set your error classes here. Chainable method.
 - `name`: a `string` or an `object`
 - `handle` : a `function`

If `name` is a `string` then `handle` should be a function. If `handle` is not given `name` is expected to be an `object`. Sugar for this:

```js
herro
  .set('my-error', function(err){
    err.message = ' argument `'+err.message+'` not supported';
    return err;
  }).set('other error', function(err){
    err.message = ' go out and take some beers already!'
    return err;
  })

// the above is equivalent to
herro.set({
  'my-error' : function(err){
    err.message = ' argument `'+err.message+'` not supported';
    return err;
  },
  'other error' : function(err){
    err.message = ' go out and take some beers already!'
    return err;
  }
})

```

All classes inherit from `Herror` if you want that changed [let me know](https://github.com/stringparser/herro/issues/new).

## herro.get(name[, message])

Get the `errorClass` you set with `herro.set`

  - `name`: a `string`
  - `message`: optional `string` message.

If `message` is not given returns your errorClass `name`.
If `message` *is* given returns an error instance of that errorClass `name`.

## flags

Enforce all stack traces to show package versions:

```sh
export ERROR_FLOOD=true node index.js
```

Shut up all the way down
```sh
export NO_FLAGS node index.js
```
The above in case anyone left `process.env.ERROR_FLOOD = true` written somewhere.

## tests

```sh
make test
```

or

```
npm test
```

## todo

 - [ ] make more tests.
 - [ ] more interfaces for error instances (like `Herror.stream` or `Herror.catch`) that would be helpful to have.

### stats

[<img src="https://nodei.co/npm/herro.png?downloads=true&downloadRank=true&stars=true" alt="NPM" align="center"/>](https://nodei.co/npm/herro)

[<img src="https://nodei.co/npm-dl/herro.png" alt="NPM" align="center"/>](https://nodei.co/npm/herro/)

## license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/herro.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)

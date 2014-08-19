#

[<img alt="npm downloads" src="http://img.shields.io/npm/dm/herro.svg?style=flat-square" align="right"/>](http://img.shields.io/npm/dm/herro.svg)
[<img alt="NPM version" src="http://img.shields.io/npm/v/herro.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/herro)
[<img alt="build" src="http://img.shields.io/travis/stringparser/herro/master.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/herro/builds)

## herro
> Humanize the `Error` class[<img alt="progressed.io" src="http://progressed.io/bar/50" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

The aim of this project is to humanize stack traces writing package's versions and names directly on the table.

## example

Say you have this stack.

[<img src="./docs/example_stack.png" alt="center"/>](https://github.com/stringparser/runtime)

What if looked like this?

[<img src="./docs/example_stack2.png" alt="center"/>](https://github.com/stringparser/runtime)
> note that instead of `node_modules/moduleName` you see `moduleName@version`

## install

```
npm install herro --save
```

## usage

Out of the package you get a plain old `Herror` class that only takes one argument (the message to be written).

```js
var Herror = require('herro').Herror;
```

Just use it as you normally would with `Error` and you would get stack traces like above.

Also, if you want to enforce *any* v8 stacktrace to have the package names and versions written there is a flag you can use for that

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

throw new myErrorClass('I would want coffee and toasts');
// or also
throw new herror.get('my-custom-error', 'I would want coffee and toasts')
```

which as you would guess will `throw`

```sh
throw new myErrorClass('I would want coffee and toasts')
      ^
 Error: I would want coffee and toasts with orange juice please

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

## api

#### herro.Herror

Inherits from `Error` an error class with formatted stack trace. You can call it with and without `new`.

If you use `call` or `apply` it will spect you use an `Error` instance for `this`. That is:

```js
var herro = require('herro').Herror;
var myThing = {};

Herror.call(myThing)
Herror.apply(myTHing)

// Both above will throw an error
```

#### herro.set(name, handle)

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

#### herro.get(name[, message])

Get the `errorClass` you set with `herro.set`

  - `name`: a `string`
  - `message`: optional `string` message.

If `message` is not given returns your errorClass `name`.
If `message` *is* given returns an error instance of that errorClass `name`.

#### FLAGS



## license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/gulp-runtime.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)

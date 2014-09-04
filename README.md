[<img alt="npm downloads" src="http://img.shields.io/npm/dm/herro.svg?style=flat-square" align="right"/>](http://img.shields.io/npm/dm/herro.svg)
[<img alt="build" src="http://img.shields.io/travis/stringparser/herro/master.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/herro/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/herro.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/herro)

### herro!

[<img alt="progressed.io" src="http://progressed.io/bar/75" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

What if stack traces looked like this?

[<img src="https://raw.githubusercontent.com/stringparser/herro/master/docs/example_stack2.png"  align="center"/>](https://github.com/stringparser/runtime)


 changes...                                          | adds...                        |
:----------------------------------------------------|:--------------------------------------------------------
 `node_modules/moduleName` to `moduleName@version`   | an `arch` badge with format `node@version`
 `project-path` to `project-path@version`            | a `source` being the first `node_module` encountered

Note: If `package.json` doesn't exist `project-path` will be relative to the outer directory of your `PWD`.

## install

```
npm install herro --save
```

## usage

The package gives two flavors. One declarative and other imperative.

#### imperative: make it so

To enforce *any* `v8` stacktrace to have the package names.

Options:

**NODE_ENV = test**                      | **`herro#everywhere`**
-----------------------------------------|--------------------------------
All stack traces default to this format. | `require('herro').everywhere()`

#### declarative: customize error instances

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

Inherits from `Error`. An error class with formatted stack trace. You can call it with and without `new`.

`Herror.call` or `apply` will expect you to use an `Error` instance for `this`.

That is:

```js
var herro = require('herro').Herror;
var myThing = {};

Herror.call(myThing)
Herror.apply(myTHing)

// Both above will fail
// The one below will not

try {
  myThing.cuts.diamonds
} catch(err){
  throw Herror.call(err);
}
```

## herro.set(name, handle)

Set your error classes here. Chainable method.
 - `name`: a `string` or an `object`
 - `handle` : a `function`

The first argument passed to the *handle* is a `Herror` instance.

If `name` is a `string` then `handle` should be a function. If `handle` is not given `name` is expected to be an `object`.

Sugar for this:

```js
var herro = require('herro');

herro
  .set('my-error', function(err){
    err.message = ' argument `'+err.message+'` not supported';
  })
  .set('other error', function(err){
    err.message = ' go out and take some beers already!'
  })

// the above is equivalent to
herro.set({
  'my-error' : function(err){
    err.message = ' argument `'+err.message+'` not supported';
  },
  'other error' : function(err){
    err.message = ' go out and take some beers already!'
  }
})

```

 **`Herror` instance properties**

  If a `limit` property is set on the instance the stack trace limit will be   adjusted accordingly. That means:

  ```js
  herror.set('no-brainer', function(error){
    error.limit = 0;
  })
  ```

 will cause that error to have no stack trace.

  **NOTE**: the global `Error.stackTraceLimit` is respected, just before capturing the stack trace the value is saved and before the constructor returns is restored.


All classes inherit from `Herror` if you want that changed [let me know](https://github.com/stringparser/herro/issues/new).

## herro.get(name[, message])

Get the `errorClass` you set with `herro.set`

  - `name`: a `string`
  - `message`: optional `string` message.

If `message` is not given returns your errorClass `name`.

If `message` *is* given returns an error instance of that errorClass `name` with that `message`.

## flags

Enforce all stack traces to show package versions:

```sh
export ERROR_FLOOD=true && node index.js
```

Shut up all the way down
```sh
export NO_FLAGS && node index.js
```
The above in case anyone left `process.env.ERROR_FLOOD = true` written somewhere.

## tests

  $ make test

or

  $ npm test

## todo

 - [ ] make more tests.
 - [ ] more interfaces for error instances (like `Herror.stream` or `Herror.catch`) that would be helpful to have.

### stats

[<img src="https://nodei.co/npm/herro.png?downloads=true&downloadRank=true&stars=true" alt="NPM" align="center"/>](https://nodei.co/npm/herro)

[<img src="https://nodei.co/npm-dl/herro.png" alt="NPM" align="center"/>](https://nodei.co/npm/herro/)

## license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/herro.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)

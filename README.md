#

[<img alt="npm downloads" src="http://img.shields.io/npm/dm/herro.svg?style=flat-square" align="right"/>](http://img.shields.io/npm/dm/herro.svg)
[<img alt="NPM version" src="http://img.shields.io/npm/v/herro.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/herro)
[<img alt="build" src="http://img.shields.io/travis/stringparser/herro/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/herro/builds)

## Herro
> Humanize the `Error` class[<img alt="progressed.io" src="http://progressed.io/bar/50" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

<br>


The aim of this project is to humanize stack traces writing package's versions and names directly on the table to save up time and effort.

The code should give two flavors: one that uses `Error.prepareStackTrace` so you can enforce *any* (v8) stack trace to look like you want and a more responsible one that only uses this kind of stacks, where `instead` of inheriting from `Error`, you inherit from `Herror`.

<hr>

<b>Implementation status</b>: tests and documentation coming today.

What I have so far (I've picked `gulp`for testing just because I'm doing stuff with gulp at the moment).

Say you have this stack:
```js
/home/jcm/code/herro/node_modules/gulp/node_modules/orchestrator/node_modules/sequencify/index.js:3
throw new Error('Hello sequencify!')
      ^

 Error: Hello sequencify!
    at Object.<anonymous> (/home/jcm/code/herro/node_modules/gulp/node_modules/orchestrator/node_modules/sequencify/index.js:3:7)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.require (module.js:364:17)
    at require (module.js:380:17)
    at Object.<anonymous> (/home/jcm/code/herro/node_modules/gulp/node_modules/orchestrator/index.js:156:36)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
```

Why shoudn't it look like this?

Note than instead of `node_modules/moduleName` you see `moduleName@moduleVersion`

```js
/home/jcm/code/herro/node_modules/gulp/node_modules/orchestrator/node_modules/sequencify/index.js:3

throw new Error('Hello sequencify!')
      ^

 Error: Hello sequencify!

 source: sequencify@0.0.7
 --
 start  Object.<anonymous>
     >  my-project@version/gulp@3.8.7/orchestrator@0.3.7/sequencify@0.0.7/index.js:3:7
    at  Module._compile (module.js:456:26)
    at  Object.Module._extensions..js (module.js:474:10)
    at  Module.load (module.js:356:32)
    at  Function.Module._load (module.js:312:12)
    at  Module.require (module.js:364:17)
    at  require (module.js:380:17)
    at  Object.<anonymous> my-project@version/gulp@3.8.7/orchestrator@0.3.7/index.js:156:36
    at  Module._compile (module.js:456:26)
    at  Object.Module._extensions..js (module.js:474:10)
    at  Module.load (module.js:356:32)
    at  Function.Module._load (module.js:312:12)
    at  Module.require (module.js:364:17)
    at  require (module.js:380:17)
    at  Object.<anonymous> my-project@version/gulp@3.8.7/index.js:4:20
    at  Module._compile (module.js:456:26)
    at  Object.Module._extensions..js (module.js:474:10)
    at  Module.load (module.js:356:32)
    at  Function.Module._load (module.js:312:12)
    at  Module.require (module.js:364:17)
    at  require (module.js:380:17)
    at  Object.<anonymous> (my-project@version/test/index.js:4:12)
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

Another using [runtime](https://github.com/stringparser/runtime)

```js
module.js:340
    throw err;
          ^
 Error: Cannot find module 'f'

 source: runtime@0.1.28/lib/runtime.js:6:10
 --
 start  Function.Module._resolveFilename
     >  (module.js:338:15)
    at  Function.Module._load (module.js:280:25)
    at  Module.require (module.js:364:17)
    at  require (module.js:380:17)
    at  Object.<anonymous> (runtime@0.1.28/lib/runtime.js:6:10)
    at  Module._compile (module.js:456:26)
    at  Object.Module._extensions..js (module.js:474:10)
    at  Module.load (module.js:356:32)
    at  Function.Module._load (module.js:312:12)
    at  Module.require (module.js:364:17)
    at  new require (module.js:380:17)
    at  Object.<anonymous> (runtime@0.1.28/test/test.command.js:9:3)
    at  Module._compile (module.js:456:26)
    at  Object.Module._extensions..js (module.js:474:10)
    at  Module.load (module.js:356:32)
    at  Function.Module._load (module.js:312:12)
    at  Module.require (module.js:364:17)
    at  require (module.js:380:17)
    at  runtime@0.1.28/node_modules/mocha/lib/mocha.js:183:27
    at  Array.forEach (native)
    at  Mocha.loadFiles runtime@0.1.28/mocha@1.21.4/lib/mocha.js:180:14
    at  Mocha.run runtime@0.1.28/mocha@1.21.4/lib/mocha.js:382:31
    at  Object.<anonymous> runtime@0.1.28/mocha@1.21.4/bin/_mocha:381:16
    at  Module._compile (module.js:456:26)
    at  Object.Module._extensions..js (module.js:474:10)
    at  Module.load (module.js:356:32)
    at  Function.Module._load (module.js:312:12)
    at  Function.Module.runMain (module.js:497:10)
    at  startup (node.js:119:16)
    at  node.js:906:3
 --
 node@0.10.30

make: *** [test] Error 8
```

## license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/gulp-runtime.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)

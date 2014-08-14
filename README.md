## This is an experiment so far

The aim of this project is to humanize stack traces writing package's versions and names directly on the table to save up time and effort.

<hr>

First results on this.

The code should give two flavors: one that uses `Error.prepareStackTrace` so you can enforce *any* (v8) stack trace to look like you want and a more responsible one that only uses this kind of stacks, where `instead` of inheriting from `Error`, you inherit from `Herror`.

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
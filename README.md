## Just started the project, don't clone this repo

Say you have this stack:
```bash
/home/jcm/code/herro/node_modules/gulp/node_modules/orchestrator/node_modules/sequencify/index.js:4
throw new Error('Hello orchestrator!')
      ^
Error: Hello orchestrator!
    at Object.<anonymous> (/home/jcm/code/herro/node_modules/gulp/node_modules/orchestrator/node_modules/sequencify/index.js:4:7)
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
```bash
/home/jcm/code/herro/node_modules/gulp/node_modules/orchestrator/node_modules/sequencify/index.js:4
throw new Error('Hello orchestrator!')
      ^
  From: sequencify@0.0.7
 Error: Hello orchestrator!
 --
 start: Object.<anonymous> (my-goodness@10.1.3/gulp@3.8.7/orchestrator@0.3.7/sequencify@0.0.7/index.js:4:7)
     at Module._compile (module.js:456:26)
     at Object.Module._extensions..js (module.js:474:10)
     at Module.load (module.js:356:32)
     at Function.Module._load (module.js:312:12)
     at Module.require (module.js:364:17)
     at require (module.js:380:17)
     at Object.<anonymous> (my-goodness@10.1.3/gulp@3.8.7/orchestrator@0.3.7/index.js:156:36)
     at Module._compile (module.js:456:26)
     at Object.Module._extensions..js (module.js:474:10)
 --
 node@0.10.30
```
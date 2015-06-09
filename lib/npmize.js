'use strict';

var badges;

function npmize(stack){
  var modules = stack.match(/(.*?\/node_modules\/.*?)\/.+/g) || [];
  makeBadges(modules);

  modules.forEach(function(path){
    console.log(path);
  });

  return stack.replace(process.cwd(), '.');
}

function makeBadges(modulePaths){
  if(!badges){ badges = {_:[]}; }

  Object.keys(modulePaths).filter(function(key){
    return /node_modules/.test(key);
  }).forEach(function(modulePath){
    var re = /(.+?node_modules[\\//]){1}(.+?)[\\//]/;
    var match, pack, count = 1, badge = '';

    while(re.test(modulePath)){
      match = modulePath.match(re);
      pack = require(match[0] + 'package.json');
      if(!badge){ badge = match[0]; }

      badge += pack.name + '@' + pack.version;

      if(!badges[badge]){
        badges[badge] = match[0].slice(0, match[0].length-1);
        badges._.push({path: badges[badge], badge: badge});
      }

      re = new RegExp(re.source.replace(/\d+/, ++count));
    }
  });
}

exports = module.exports = npmize;

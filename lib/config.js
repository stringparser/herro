
/*
 *
 */

var Config = function(){

  var config = {};

  this.set = function(name, handle){

    if(arguments.length > 0 && !handle){
      merge(config, name);
    }
    else {
      config[name] = handle;
    }

  };

  this.get = function(name){

    var source = config;

    if(source[name]){
      return source[name];
    }
    else {
      return source;
    }
  };

};


/*
 * jaredhanson's merge
 *
 * https://github.com/jaredhanson/utils-merge
 */

function merge(a,b){

  if(a && b){
    for(var key in b){
      a[key] = b[key];
    }
  }
  return a;
}

exports = module.exports = Config;

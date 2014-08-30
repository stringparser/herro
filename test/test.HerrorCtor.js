var assert = require('better-assert');
var herro = require('../.');
var Herror = herro.Herror;

var error = new Herror('Let\'s go!');

// # props
var allprops = Object.getOwnPropertyNames(error).join(',');

process.stdout.write(
  'allprops=[' + allprops + '] '
);

assert(  allprops.match(/stack|message|arch/g) !== null);

// # inheritance

assert( error instanceof Error );
assert( error instanceof Herror );

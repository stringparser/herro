var assert = require('better-assert');
var herro = require('../.');
var error;

herro.set('props', function(error, stack){

  error.plugin = 'myPlugin';
});

var ErrorProps = herro.get('props');
var error = new ErrorProps('plugin');

var enumprops = Object.keys(error);
var allprops = Object.getOwnPropertyNames(error);

process.stdout.write(
  'enumprops=['+enumprops + '] ; allprops=[' + allprops + '] '
);

assert( error.message === 'plugin' );
assert( error.plugin  === 'myPlugin' );
assert( enumprops.indexOf('plugin') > -1 );
assert(  allprops.indexOf(error) < 0 );

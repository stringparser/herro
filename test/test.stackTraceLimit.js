
var assert = require('better-assert');
var herro = require('../.');
var error;
var NODE_ENV = process.env.NODE_ENV;

var error = new herro.Herror('Error.stackTraceLimit');

process.stdout.write(
  ' error.stack.split(\'\\n\').length= '+error.stack.split('\n').length +
  ' ; NODE_ENV='+NODE_ENV+' => '+Error.stackTraceLimit+' '
);

if( NODE_ENV === 'test' )
  assert( Error.stackTraceLimit === Infinity );

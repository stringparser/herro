
var assert = require('better-assert');
var herro = require('../.');
var ErrorCtor, error;
var NODE_ENV = process.env.NODE_ENV;
var limit = 1;

herro.set('Error.stackTraceLimit', function(error){
  error.limit = limit;
});

ErrorCtor = herro.get('Error.stackTraceLimit');
error = new ErrorCtor('Custom limit');

process.stdout.write(
  'error.limit = '+limit+' ; '+
  'error.stack.length = '+(error.stack.split('\n').length-7) + ' ; '+
  'NODE_ENV='+NODE_ENV+' => stackTraceLimit: '+Error.stackTraceLimit+' '
);

if( NODE_ENV === 'test' )
  assert( Error.stackTraceLimit === Infinity );
else
  assert( (error.stack.split('\n').length-7) === limit );

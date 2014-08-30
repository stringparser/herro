
var assert = require('better-assert');

process.stdout.write('Error.stackTraceLimit= '+Error.stackTraceLimit);

assert( Error.stackTraceLimit === 10 );

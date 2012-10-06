
var basicscript = require('../'),
    assert = require('assert');

// Execute null

assert.equal(null, basicscript.execute(null));

// Execute empty string

assert.equal(null, basicscript.execute(''));

// Execute spaces

assert.equal(null, basicscript.execute('  '));


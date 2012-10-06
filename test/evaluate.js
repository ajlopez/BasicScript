
var basicscript = require('../'),
    assert = require('assert');

// Evaluate null

assert.equal(null, basicscript.evaluate(null));

// Evaluate empty string

assert.equal(null, basicscript.evaluate(''));

// Evaluate spaces

assert.equal(null, basicscript.evaluate('  '));


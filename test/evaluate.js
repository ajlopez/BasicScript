
var basicscript = require('../'),
    assert = require('assert');

// Evaluate null

assert.equal(null, basicscript.evaluate(null));

// Evaluate empty string

assert.equal(null, basicscript.evaluate(''));

// Evaluate spaces

assert.equal(null, basicscript.evaluate('  '));

// Evaluate integer

assert.equal(123, basicscript.evaluate('123'));

// Evaluate string delimited by single quotes

assert.equal('foo', basicscript.evaluate("'foo'"));

// Evaluate string delimited by double quotes

assert.equal('foo', basicscript.evaluate('"foo"'));


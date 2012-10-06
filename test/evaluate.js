
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

// Evaluate undefined name

var context = new basicscript.Context();

assert.equal(null, basicscript.evaluate('foo', context));

// Define values

context.setValue('one', 1);
context.setValue('two', 2);

assert.equal(1, context.getValue('one'));

// Evaluate defined name

assert.equal(1, basicscript.evaluate('one', context));

// Evaluate add integers

assert.equal(3, basicscript.evaluate('1+2'));

// Evaluate add names

assert.equal(3, basicscript.evaluate('one+two', context));


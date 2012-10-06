
var basicscript = require('../'),
    assert = require('assert');

var parser = new basicscript.Parser();

assert.ok(parser);

// Parse integer expression

var parser = new basicscript.Parser('123');
var expression = parser.parseExpression();

assert.ok(expression);
assert.equal(123, expression.value);
assert.equal(123, expression.evaluate());

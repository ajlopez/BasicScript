
global.testing = true;

var basicscript = require('../'),
    assert = require('assert');

var parser = new basicscript.Parser();

assert.ok(parser);

// Parse integer expression

var parser = new basicscript.Parser('123');
var expression = parser.parseExpression();

assert.ok(expression);
assert.equal(123, expression.evaluate());

assert.equal(null, parser.parseExpression());

// Parse integer expression with spaces

var parser = new basicscript.Parser(' 123 ');
var expression = parser.parseExpression();

assert.ok(expression);
assert.equal(123, expression.evaluate());

assert.equal(null, parser.parseExpression());

// Parse string expression with double quote

var parser = new basicscript.Parser('"foo"');
var expression = parser.parseExpression();

assert.ok(expression);
assert.equal('foo', expression.evaluate());

assert.equal(null, parser.parseExpression());

// Parse string expression with single quote

var parser = new basicscript.Parser("'foo'");
var expression = parser.parseExpression();

assert.ok(expression);
assert.equal('foo', expression.evaluate());

assert.equal(null, parser.parseExpression());

// Evaluate name without context as null

var parser = new basicscript.Parser("foo");
var expression = parser.parseExpression();

assert.ok(expression);
assert.equal(null, expression.evaluate());

// Evaluate undefined name as null

var parser = new basicscript.Parser("foo");
var expression = parser.parseExpression();
var context = new basicscript.Context();

assert.ok(expression);
assert.equal(null, expression.evaluate());

// Set initial values

context.setValue('one', 1);
context.setValue('two', 2);

// Evaluate add integers

var parser = new basicscript.Parser("1+2");
var expression = parser.parseExpression();

assert.ok(expression);
assert.equal(3, expression.evaluate());

// Execute simple assign

var parser = new basicscript.Parser("a=1");
var command = parser.parseCommand();

assert.ok(command);
command.execute(context);

assert.equal(1, context.getValue("a"));

// Execute expression assign

var parser = new basicscript.Parser("b=1+2");
var command = parser.parseCommand();

assert.ok(command);
assert.ok(command instanceof basicscript.AssignCommand);
command.execute(context);

assert.equal(3, context.getValue("b"));

// Execute simple expression

var parser = new basicscript.Parser("1+2\n");
var command = parser.parseCommand();

assert.ok(command);
assert.ok(command instanceof basicscript.ExpressionCommand);
assert.equal(3, command.evaluate(context));

// Execute two commands

var parser = new basicscript.Parser("a=2\nb=3");
var command = parser.parseCommand();

assert.ok(command);
assert.ok(command instanceof basicscript.AssignCommand);
command.execute(context);

command = parser.parseCommand();

assert.ok(command);
assert.ok(command instanceof basicscript.AssignCommand);
command.execute(context);

assert.equal(2, context.getValue("a"));
assert.equal(3, context.getValue("b"));

// Parse equals expression

var parser = new basicscript.Parser("one = 1");
var expression = parser.parseExpression();

assert.ok(expression);
assert.ok(expression instanceof basicscript.BinaryExpression);
assert.equal(expression.evaluate(context), true);

// Parse and execute if command

var parser = new basicscript.Parser("if one = 1\nb=4\nend");
var command = parser.parseCommand();

assert.ok(command);
assert.ok(command instanceof basicscript.IfCommand);

assert.equal(parser.parseCommand(), null);
command.execute(context);
assert.equal(4, context.getValue("b"));
assert.equal(parser.parseCommand(), null);


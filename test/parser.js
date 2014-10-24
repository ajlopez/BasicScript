
var bsparser = require('../lib/bsparser');
var basicscript = require('..');

var context;

exports['get parser'] = function (test) {
    var parser = bsparser.parser();

    test.ok(parser);
}

exports['parse integer expression'] = function (test) {
    var parser = bsparser.parser('123');
    var expression = parser.parseExpression();

    test.ok(expression);
    test.equal(123, expression.evaluate());

    test.equal(null, parser.parseExpression());
}

exports['parse integer expression with spaces'] = function (test) {
    var parser = bsparser.parser(' 123 ');
    var expression = parser.parseExpression();

    test.ok(expression);
    test.equal(123, expression.evaluate());

    test.equal(null, parser.parseExpression());
}

exports['parse string expression with double quote'] = function (test) {
    var parser = bsparser.parser('"foo"');
    var expression = parser.parseExpression();

    test.ok(expression);
    test.equal('foo', expression.evaluate());

    test.equal(null, parser.parseExpression());
}

exports['parse string expression with single quote'] = function (test) {
    var parser = bsparser.parser("'foo'");
    var expression = parser.parseExpression();

    test.ok(expression);
    test.equal('foo', expression.evaluate());

    test.equal(null, parser.parseExpression());
}

exports['evaluate name without context as null'] = function (test) {
    var parser = bsparser.parser("foo");
    var expression = parser.parseExpression();

    test.ok(expression);
    test.equal(null, expression.evaluate());
}

exports['evaluate undefined name as null'] = function (test) {
    var parser = bsparser.parser("foo");
    var expression = parser.parseExpression();

    test.ok(expression);
    test.equal(null, expression.evaluate());
}

exports['set and get initial values'] = function (test) {
    context = basicscript.context();
    context.setValue('one', 1);
    context.setValue('two', 2);
    test.equal(context.getValue('one'), 1);
    test.equal(context.getValue('two'), 2);
}

exports['evaluate add integers'] = function (test) {
    var parser = bsparser.parser("1+2");
    var expression = parser.parseExpression();

    test.ok(expression);
    test.equal(3, expression.evaluate());
}

exports['execute simple assign'] = function (test) {
    var parser = bsparser.parser("a=1");
    var command = parser.parseCommand();

    test.ok(command);
    command.execute(context);

    test.equal(1, context.getValue("a"));
}

exports['execute expression assign'] = function (test) {
    var parser = bsparser.parser("b=1+2");
    var command = parser.parseCommand();

    test.ok(command);
    command.execute(context);

    test.equal(3, context.getValue("b"));
}

exports['execute simple expression'] = function (test) {
    var parser = bsparser.parser("1+2\n");
    var command = parser.parseCommand();

    test.ok(command);
    test.equal(3, command.evaluate(context));
}

exports['execute two commands'] = function (test) {
    var parser = bsparser.parser("a=2\nb=3");
    var command = parser.parseCommand();

    test.ok(command);
    command.execute(context);

    command = parser.parseCommand();

    test.ok(command);
    command.execute(context);

    test.equal(2, context.getValue("a"));
    test.equal(3, context.getValue("b"));
}

exports['parse equals expression'] = function (test) {
    var parser = bsparser.parser("one = 1");
    var expression = parser.parseExpression();

    test.ok(expression);
    test.strictEqual(expression.evaluate(context), true);
}

exports['parse less expression'] = function (test) {
    var parser = bsparser.parser("one < 1");
    var expression = parser.parseExpression();

    test.ok(expression);
    test.strictEqual(expression.evaluate(context), false);
}

exports['parse greater expression'] = function (test) {
    var parser = bsparser.parser("one > 0");
    var expression = parser.parseExpression();

    test.ok(expression);
    test.strictEqual(expression.evaluate(context), true);
}

exports['parse and execute if command'] = function (test) {
    var parser = bsparser.parser("if one = 1\nb=4\nc=5\nend");
    var command = parser.parseCommand();

    test.ok(command);

    test.equal(parser.parseCommand(), null);
    command.execute(context);
    test.equal(4, context.getValue("b"));
    test.equal(5, context.getValue("c"));
    test.equal(parser.parseCommand(), null);
}

exports['parse and execute if command with else'] = function (test) {
    var parser = bsparser.parser("if one = 2\nb=5\nelse\nc=6\nend");
    var command = parser.parseCommand();

    test.ok(command);

    test.equal(parser.parseCommand(), null);
    command.execute(context);
    test.notEqual(5, context.getValue("b"));
    test.equal(6, context.getValue("c"));
    test.equal(parser.parseCommand(), null);
}

exports['parse and execute while command'] = function (test) {
    context.setValue("d", 1);
    var parser = bsparser.parser("while d = 1\nd = d + 1\nend");
    var command = parser.parseCommand();

    test.ok(command);

    test.equal(parser.parseCommand(), null);
    command.execute(context);
    test.equal(2, context.getValue("d"));
    test.equal(parser.parseCommand(), null);
}

exports['parse and execute for command'] = function (test) {
    context.setValue("a", 0);
    var parser = bsparser.parser("for k = 1 to 3\na = a + k\nend");
    var command = parser.parseCommand();

    test.ok(command);

    test.equal(parser.parseCommand(), null);
    command.execute(context);
    test.equal(context.getValue("a"), 6);
    test.equal(context.getValue("k"), 4);
    test.equal(parser.parseCommand(), null);
}

exports['parse and execute for command with positive step'] = function (test) {
    context.setValue("a", 0);
    var parser = bsparser.parser("for k = 1 to 5 step 2\na = a + k\nend");
    var command = parser.parseCommand();

    test.ok(command);

    test.equal(parser.parseCommand(), null);
    command.execute(context);
    test.equal(context.getValue("a"), 9);
    test.equal(context.getValue("k"), 7);
    test.equal(parser.parseCommand(), null);
}

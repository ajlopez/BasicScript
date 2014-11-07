
var basicscript = require('../');

var context;

exports['evaluate null'] = function (test) {
    test.equal(basicscript.evaluate(null), null);
}

exports['evaluate empty string'] = function (test) {
    test.equal(basicscript.evaluate(''), null);
}

exports['evaluate spaces'] = function (test) {
    test.equal(basicscript.evaluate('  '), null);
}

exports['evaluate integer'] = function (test) { 
    test.equal(basicscript.evaluate('123'), 123);
}

exports['evaluate negative integer'] = function (test) { 
    test.equal(basicscript.evaluate('-123'), -123);
}

exports['evaluate positive integer'] = function (test) { 
    test.equal(basicscript.evaluate('+123'), 123);
}

exports['evaluate real'] = function (test) { 
    test.equal(basicscript.evaluate('123.45'), 123.45);
}

exports['evaluate negative real'] = function (test) { 
    test.equal(basicscript.evaluate('-123.45'), -123.45);
}

exports['evaluate positive real'] = function (test) { 
    test.equal(basicscript.evaluate('+123.45'), 123.45);
}

exports['evaluate string delimited by single quotes'] = function (test) {
    test.equal(basicscript.evaluate("'foo'"), 'foo');
}

exports['evaluate string delimited by double quotes'] = function (test) {
    test.equal(basicscript.evaluate('"foo"'), 'foo');
}

exports['evaluate undefined name'] = function (test) {
    context = basicscript.context();

    test.equal(basicscript.evaluate('foo', context), null);
}

exports['define values'] = function (test) {
    context.setValue('one', 1);
    context.setValue('two', 2);
    context.setValue('three', 3);

    test.equal(context.getValue('one'), 1);
}

exports['evaluate defined name'] = function (test) {
    test.equal(basicscript.evaluate('one', context), 1);
}

exports['evaluate add integers'] = function (test) {
    test.equal(basicscript.evaluate('1+2'), 3);
}

exports['evaluate add names'] = function (test) {
    test.equal(basicscript.evaluate('one+two', context), 3);
}

exports['evaluate subtract integers'] = function (test) {
    test.equal(basicscript.evaluate('1-2'), -1);
}

exports['evaluate subtract names'] = function (test) {
    test.equal(basicscript.evaluate('one-two', context), -1);
}

exports['evaluate multiply integers'] = function (test) {
    test.equal(basicscript.evaluate('2*3'), 6);
}

exports['evaluate multiply names'] = function (test) {
    test.equal(basicscript.evaluate('two*three', context), 6);
}

exports['evaluate divide integers'] = function (test) {
    test.equal(basicscript.evaluate('2/3'), 2/3);
}

exports['evaluate divide integers'] = function (test) {
    test.equal(basicscript.evaluate('2.1/3.2'), 2.1/3.2);
}

exports['evaluate divide names'] = function (test) {
    test.equal(basicscript.evaluate('two/three', context), 2/3);
}

exports['evaluate comparison operators'] = function (test) {
    test.strictEqual(basicscript.evaluate('1 = 1'), true);
    test.strictEqual(basicscript.evaluate('1 = 2'), false);

    test.strictEqual(basicscript.evaluate('1 < 1'), false);
    test.strictEqual(basicscript.evaluate('1 < 2'), true);
    test.strictEqual(basicscript.evaluate('1 > 1'), false);
    test.strictEqual(basicscript.evaluate('1 > 2'), false);

    test.strictEqual(basicscript.evaluate('1 <= 1'), true);
    test.strictEqual(basicscript.evaluate('1 <= 2'), true);
    test.strictEqual(basicscript.evaluate('1 >= 1'), true);
    test.strictEqual(basicscript.evaluate('1 >= 2'), false);

    test.strictEqual(basicscript.evaluate('1 <> 1'), false);
    test.strictEqual(basicscript.evaluate('1 <> 2'), true);
}

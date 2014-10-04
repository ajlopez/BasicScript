
var basicscript = require('../');

var context;

exports['evaluate null'] = function (test) {
    test.equal(null, basicscript.evaluate(null));
}

exports['evaluate empty string'] = function (test) {
    test.equal(null, basicscript.evaluate(''));
}

exports['evaluate spaces'] = function (test) {
    test.equal(null, basicscript.evaluate('  '));
}

exports['evaluate integer'] = function (test) { 
    test.equal(123, basicscript.evaluate('123'));
}

exports['evaluate string delimited by single quotes'] = function (test) {
    test.equal('foo', basicscript.evaluate("'foo'"));
}

exports['evaluate string delimited by double quotes'] = function (test) {
    test.equal('foo', basicscript.evaluate('"foo"'));
}

exports['evaluate undefined name'] = function (test) {
    context = new basicscript.Context();

    test.equal(null, basicscript.evaluate('foo', context));
}

exports['define values'] = function (test) {
    context.setValue('one', 1);
    context.setValue('two', 2);
    context.setValue('three', 3);

    test.equal(1, context.getValue('one'));
}

exports['evaluate defined name'] = function (test) {
    test.equal(1, basicscript.evaluate('one', context));
}

exports['evaluate add integers'] = function (test) {
    test.equal(3, basicscript.evaluate('1+2'));
}

exports['evaluate add names'] = function (test) {
    test.equal(3, basicscript.evaluate('one+two', context));
}

exports['evaluate subtract integers'] = function (test) {
    test.equal(-1, basicscript.evaluate('1-2'));
}

exports['evaluate subtract names'] = function (test) {
    test.equal(-1, basicscript.evaluate('one-two', context));
}

exports['evaluate multiply integers'] = function (test) {
    test.equal(6, basicscript.evaluate('2*3'));
}

exports['evaluate multiply names'] = function (test) {
    test.equal(6, basicscript.evaluate('two*three', context));
}

exports['evaluate divide integers'] = function (test) {
    test.equal(2/3, basicscript.evaluate('2/3'));
}

exports['evaluate divide names'] = function (test) {
    test.equal(2/3, basicscript.evaluate('two/three', context));
}

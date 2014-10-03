
global.testing = true;

var basicscript = require('../');
    
exports['get token type and lexer'] = function (test) {
    var TokenType = basicscript.TokenType;
    var lexer = new basicscript.Lexer();
    test.ok(lexer);
    test.equal(null, lexer.nextToken());
}

exports['parse integer'] = function (test) {
    var lexer = new basicscript.Lexer('123');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(123, token.value);
    test.equal(basicscript.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse integer with spaces'] = function (test) {
    var lexer = new basicscript.Lexer('  123 ');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(123, token.value);
    test.equal(basicscript.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse string token with double quote'] = function (test) {
    var lexer = new basicscript.Lexer('"foo"');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal('foo', token.value);
    test.equal(basicscript.TokenType.String, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse string token with single quote'] = function (test) {
    var lexer = new basicscript.Lexer("'foo'");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal('foo', token.value);
    test.equal(basicscript.TokenType.String, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse two integers'] = function (test) {
    var lexer = new basicscript.Lexer("123 456");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(123, token.value);
    test.equal(basicscript.TokenType.Integer, token.type);

    token = lexer.nextToken();

    test.ok(token);
    test.equal(456, token.value);
    test.equal(basicscript.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name'] = function (test) {
    var lexer = new basicscript.Lexer("a");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("a", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with upper case letters'] = function (test) {
    var lexer = new basicscript.Lexer("FOO");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("FOO", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with mixed case letters'] = function (test) {
    var lexer = new basicscript.Lexer("Foo");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("Foo", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with digits'] = function (test) {
    var lexer = new basicscript.Lexer("foo123");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("foo123", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with underscore at middle'] = function (test) {
    var lexer = new basicscript.Lexer("foo_bar");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("foo_bar", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with underscore at start'] = function (test) {
    var lexer = new basicscript.Lexer("_foo");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("_foo", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse add operator'] = function (test) {
    var lexer = new basicscript.Lexer("+");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("+", token.value);
    test.equal(basicscript.TokenType.Operator, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse equal operator'] = function (test) {
    var lexer = new basicscript.Lexer("=");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("=", token.value);
    test.equal(basicscript.TokenType.Operator, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse arithmetic operators'] = function (test) {
    var arithops = "+-*/";
    var l = arithops.length;
    var lexer = new basicscript.Lexer(arithops);

    for (var n = 0; n < l; n++) {
        var token = lexer.nextToken();
        test.ok(token);
        test.equal(arithops[n], token.value);
        test.equal(basicscript.TokenType.Operator, token.type);
    }

    test.equal(null, lexer.nextToken());
}

exports['parse add expression with integers'] = function (test) {
    var lexer = new basicscript.Lexer("1+2");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(1, token.value);
    test.equal(basicscript.TokenType.Integer, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal("+", token.value);
    test.equal(basicscript.TokenType.Operator, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal(2, token.value);
    test.equal(basicscript.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse add expression with names'] = function (test) {
    var lexer = new basicscript.Lexer("a+b");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("a", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal("+", token.value);
    test.equal(basicscript.TokenType.Operator, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal("b", token.value);
    test.equal(basicscript.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

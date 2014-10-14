
global.testing = true;

var bslexer = require('../lib/bslexer');
    
exports['get token type and lexer'] = function (test) {
    var TokenType = bslexer.TokenType;
    var lexer = bslexer.lexer();
    test.ok(lexer);
    test.equal(null, lexer.nextToken());
}

exports['parse integer'] = function (test) {
    var lexer = bslexer.lexer('123');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(123, token.value);
    test.equal(bslexer.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse integer with spaces'] = function (test) {
    var lexer = bslexer.lexer('  123 ');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(123, token.value);
    test.equal(bslexer.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse string token with double quote'] = function (test) {
    var lexer = bslexer.lexer('"foo"');
    var token = lexer.nextToken();

    test.ok(token);
    test.equal('foo', token.value);
    test.equal(bslexer.TokenType.String, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse string token with single quote'] = function (test) {
    var lexer = bslexer.lexer("'foo'");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal('foo', token.value);
    test.equal(bslexer.TokenType.String, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse two integers'] = function (test) {
    var lexer = bslexer.lexer("123 456");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(123, token.value);
    test.equal(bslexer.TokenType.Integer, token.type);

    token = lexer.nextToken();

    test.ok(token);
    test.equal(456, token.value);
    test.equal(bslexer.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name'] = function (test) {
    var lexer = bslexer.lexer("a");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("a", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with upper case letters'] = function (test) {
    var lexer = bslexer.lexer("FOO");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("FOO", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with mixed case letters'] = function (test) {
    var lexer = bslexer.lexer("Foo");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("Foo", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with digits'] = function (test) {
    var lexer = bslexer.lexer("foo123");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("foo123", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with underscore at middle'] = function (test) {
    var lexer = bslexer.lexer("foo_bar");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("foo_bar", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse name with underscore at start'] = function (test) {
    var lexer = bslexer.lexer("_foo");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("_foo", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse add operator'] = function (test) {
    var lexer = bslexer.lexer("+");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("+", token.value);
    test.equal(bslexer.TokenType.Operator, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse equal operator'] = function (test) {
    var lexer = bslexer.lexer("=");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("=", token.value);
    test.equal(bslexer.TokenType.Operator, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse arithmetic operators'] = function (test) {
    var arithops = "+-*/";
    var l = arithops.length;
    var lexer = bslexer.lexer(arithops);

    for (var n = 0; n < l; n++) {
        var token = lexer.nextToken();
        test.ok(token);
        test.equal(arithops[n], token.value);
        test.equal(bslexer.TokenType.Operator, token.type);
    }

    test.equal(null, lexer.nextToken());
}

exports['parse add expression with integers'] = function (test) {
    var lexer = bslexer.lexer("1+2");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(1, token.value);
    test.equal(bslexer.TokenType.Integer, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal("+", token.value);
    test.equal(bslexer.TokenType.Operator, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal(2, token.value);
    test.equal(bslexer.TokenType.Integer, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse add expression with names'] = function (test) {
    var lexer = bslexer.lexer("a+b");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("a", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal("+", token.value);
    test.equal(bslexer.TokenType.Operator, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal("b", token.value);
    test.equal(bslexer.TokenType.Name, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse new line'] = function (test) {
    var lexer = bslexer.lexer("\n");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("\n", token.value);
    test.equal(bslexer.TokenType.EndOfLine, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse carriage return, new line'] = function (test) {
    var lexer = bslexer.lexer("\r\n");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("\n", token.value);
    test.equal(bslexer.TokenType.EndOfLine, token.type);

    test.equal(null, lexer.nextToken());
}

exports['parse two new lines'] = function (test) {
    var lexer = bslexer.lexer("\n\n");
    var token = lexer.nextToken();

    test.ok(token);
    test.equal("\n", token.value);
    test.equal(bslexer.TokenType.EndOfLine, token.type);

    token = lexer.nextToken();
    test.ok(token);
    test.equal("\n", token.value);
    test.equal(bslexer.TokenType.EndOfLine, token.type);

    test.equal(null, lexer.nextToken());
}

exports['push token'] = function (test) {
    var lexer = bslexer.lexer("");
    var tokenadd = bslexer.token("+", bslexer.TokenType.Operator);
    var tokenminus = bslexer.token("-", bslexer.TokenType.Operator);
    lexer.pushToken(tokenadd);
    lexer.pushToken(tokenminus);

    test.equal(lexer.nextToken(), tokenminus);
    test.equal(lexer.nextToken(), tokenadd);
    test.equal(lexer.nextToken(), null);
}

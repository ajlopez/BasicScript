
global.testing = true;

var basicscript = require('../'),
    assert = require('assert');
    
var TokenType = basicscript.TokenType;

var lexer = new basicscript.Lexer();

assert.ok(lexer);
assert.equal(null, lexer.nextToken());

// Parse integer

var lexer = new basicscript.Lexer('123');
var token = lexer.nextToken();

assert.ok(token);
assert.equal(123, token.value);
assert.equal(basicscript.TokenType.Integer, token.type);

assert.equal(null, lexer.nextToken());

// Parse integer with spaces

var lexer = new basicscript.Lexer('  123 ');
var token = lexer.nextToken();

assert.ok(token);
assert.equal(123, token.value);
assert.equal(basicscript.TokenType.Integer, token.type);

assert.equal(null, lexer.nextToken());

// Parse string token with double quote

var lexer = new basicscript.Lexer('"foo"');
var token = lexer.nextToken();

assert.ok(token);
assert.equal('foo', token.value);
assert.equal(TokenType.String, token.type);

assert.equal(null, lexer.nextToken());

// Parse string token with single quote

var lexer = new basicscript.Lexer("'foo'");
var token = lexer.nextToken();

assert.ok(token);
assert.equal('foo', token.value);
assert.equal(TokenType.String, token.type);

assert.equal(null, lexer.nextToken());

// Parse two integers

var lexer = new basicscript.Lexer("123 456");
var token = lexer.nextToken();

assert.ok(token);
assert.equal(123, token.value);
assert.equal(TokenType.Integer, token.type);

token = lexer.nextToken();

assert.ok(token);
assert.equal(456, token.value);
assert.equal(TokenType.Integer, token.type);

assert.equal(null, lexer.nextToken());

// Parse name

var lexer = new basicscript.Lexer("a");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("a", token.value);
assert.equal(TokenType.Name, token.type);

assert.equal(null, lexer.nextToken());

// Parse name with upper case letters

var lexer = new basicscript.Lexer("FOO");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("FOO", token.value);
assert.equal(TokenType.Name, token.type);

assert.equal(null, lexer.nextToken());

// Parse name with mixed case letters

var lexer = new basicscript.Lexer("Foo");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("Foo", token.value);
assert.equal(TokenType.Name, token.type);

assert.equal(null, lexer.nextToken());

// Parse name with digits

var lexer = new basicscript.Lexer("foo123");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("foo123", token.value);
assert.equal(TokenType.Name, token.type);

assert.equal(null, lexer.nextToken());

// Parse name with underscore at middle

var lexer = new basicscript.Lexer("foo_bar");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("foo_bar", token.value);
assert.equal(TokenType.Name, token.type);

assert.equal(null, lexer.nextToken());

// Parse name with underscore at start

var lexer = new basicscript.Lexer("_foo");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("_foo", token.value);
assert.equal(TokenType.Name, token.type);

assert.equal(null, lexer.nextToken());

// Parse add operator

var lexer = new basicscript.Lexer("+");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("+", token.value);
assert.equal(TokenType.Operator, token.type);

assert.equal(null, lexer.nextToken());

// Parse equal operator

var lexer = new basicscript.Lexer("=");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("=", token.value);
assert.equal(TokenType.Operator, token.type);

assert.equal(null, lexer.nextToken());

// Parse arithmetic operators

var arithops = "+-*/";
var lexer = new basicscript.Lexer(arithops);

for (var n in arithops) {
    var token = lexer.nextToken();
    assert.ok(token);
    assert.equal(arithops[n], token.value);
    assert.equal(TokenType.Operator, token.type);
}

assert.equal(null, lexer.nextToken());

// Parse add expression with integers

var lexer = new basicscript.Lexer("1+2");
var token = lexer.nextToken();

assert.ok(token);
assert.equal(1, token.value);
assert.equal(TokenType.Integer, token.type);

token = lexer.nextToken();
assert.ok(token);
assert.equal("+", token.value);
assert.equal(TokenType.Operator, token.type);

token = lexer.nextToken();
assert.ok(token);
assert.equal(2, token.value);
assert.equal(TokenType.Integer, token.type);

assert.equal(null, lexer.nextToken());

// Parse add expression with names

var lexer = new basicscript.Lexer("a+b");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("a", token.value);
assert.equal(TokenType.Name, token.type);

token = lexer.nextToken();
assert.ok(token);
assert.equal("+", token.value);
assert.equal(TokenType.Operator, token.type);

token = lexer.nextToken();
assert.ok(token);
assert.equal("b", token.value);
assert.equal(TokenType.Name, token.type);

assert.equal(null, lexer.nextToken());

// Parse new line

var lexer = new basicscript.Lexer("\n");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("\n", token.value);
assert.equal(TokenType.EndOfLine, token.type);

assert.equal(null, lexer.nextToken());

// Parse carriage return, new line

var lexer = new basicscript.Lexer("\r\n");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("\n", token.value);
assert.equal(TokenType.EndOfLine, token.type);

assert.equal(null, lexer.nextToken());

// Parse two new lines

var lexer = new basicscript.Lexer("\n\n");
var token = lexer.nextToken();

assert.ok(token);
assert.equal("\n", token.value);
assert.equal(TokenType.EndOfLine, token.type);

token = lexer.nextToken();
assert.ok(token);
assert.equal("\n", token.value);
assert.equal(TokenType.EndOfLine, token.type);

assert.equal(null, lexer.nextToken());

// Push token

var lexer = new basicscript.Lexer("");
var tokenadd = new basicscript.Token("+", TokenType.Operator);
var tokenminus = new basicscript.Token("-", TokenType.Operator);
lexer.pushToken(tokenadd);
lexer.pushToken(tokenminus);

assert.equal(lexer.nextToken(), tokenminus);
assert.equal(lexer.nextToken(), tokenadd);
assert.equal(lexer.nextToken(), null);


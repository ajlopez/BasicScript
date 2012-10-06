
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

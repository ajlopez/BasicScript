
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



var bslexer = require('./bslexer');
var bscommands = require('./bscommands');
var bsexpressions = require('./bsexpressions');

var TokenType = bslexer.TokenType;

var bsparser = (function() {    
    function Parser(text) {
        var position = 0;
        var lexer = bslexer.lexer(text);
        
        this.parseExpression = function() {
            var expression = parseTerm();
            
            if (expression == null)
                return null;
                
            var token = lexer.nextToken();
            
            if (token == null)
                return expression;
                
            while (token != null && token.type == TokenType.Operator)
            {
                var term = parseTerm();
                expression = new bsexpressions.BinaryExpression(expression, term, token.value);
                token = lexer.nextToken();
            }
            
            if (token != null)
                lexer.pushToken(token);
                
            return expression;
        }
        
        function parseName() {
            var token = lexer.nextToken();
            
            if (token == null || token.type != TokenType.Name)
                throw 'Expected name';
                
            return token.Value;
        }
        
        this.parseCommand = function() {
            var token = lexer.nextToken();
            
            if (token == null)
                return null;
                
            if (token.type == TokenType.Name) {
                var name = token.value;
                
                if (name == 'if') {
                    var expression = this.parseExpression();
                    var thencommands = [];
                    var elsecommands = [];
                    var iselse = false;
                    isEndOfCommand(lexer.nextToken());

                    for (var token = lexer.nextToken(); !isEnd(token); token = lexer.nextToken()) {
                        if (token == null)
                            throw new "end expected";
                        if (!iselse && isElse(token)) {
                            iselse = true;
                            parseToken('\n', TokenType.EndOfLine);
                        }
                        else
                            lexer.pushToken(token);
                        if (iselse)
                            elsecommands.push(this.parseCommand());                        
                        else
                            thencommands.push(this.parseCommand());                        
                    }
                    
                    return new bscommands.IfCommand(expression, thencommands, elsecommands);
                }
                
                if (name == 'while') {
                    var expression = this.parseExpression();
                    var commands = [];
                    
                    isEndOfCommand(lexer.nextToken());

                    for (var token = lexer.nextToken(); !isEnd(token); token = lexer.nextToken()) {
                        if (token == null)
                            throw new "end expected";
                        lexer.pushToken(token);
                        commands.push(this.parseCommand());                        
                    }
                    
                    return new bscommands.WhileCommand(expression, commands);
                }
                
                if (name == 'for') {
                    var name = parseName();
                    parseToken('=', TokenType.Operator);
                    var fromexpression = this.parseExpression();
                    parseToken('to', TokenType.Name);
                    var toexpression = this.parseExpression();
                    
                    var commands = [];
                    
                    isEndOfCommand(lexer.nextToken());

                    for (var token = lexer.nextToken(); !isEnd(token); token = lexer.nextToken()) {
                        if (token == null)
                            throw new "end expected";
                        lexer.pushToken(token);
                        commands.push(this.parseCommand());                        
                    }
                    
                    return new bscommands.ForCommand(name, fromexpression, toexpression, commands);
                }
                
                if (tryParseToken('=', TokenType.Operator)) {
                    var expression = this.parseExpression();
                    isEndOfCommand(lexer.nextToken());
                    return new bscommands.AssignCommand(name, expression);
                }
            }
            
            lexer.pushToken(token);
            
            var expression = this.parseExpression();
            
            isEndOfCommand(lexer.nextToken());
            
            return new bscommands.ExpressionCommand(expression);
        }
        
        function tryParseToken(value, type) {
            var token = lexer.nextToken();
            
            if (token == null)
                return false;
                
            if (token.value == value && token.type == type)
                return true;
                
            lexer.pushToken(token);
            return false;
        }
        
        function parseToken(value, type) {
            if (!tryParseToken(value, type))
                throw new "'" + value + "' expected";
        }
        
        function isEnd(token) {
            return token != null && token.type == TokenType.Name && token.value == "end";
        }
        
        function isElse(token) {
            return token != null && token.type == TokenType.Name && token.value == "else";
        }
        
        function isEndOfCommand(token) {
            if (token == null || token.type == TokenType.EndOfLine)
                return;
            
            throw new "End of Command expected";
        }
        
        function parseTerm() {
            var token = lexer.nextToken();
            
            if (token == null)
                return null;
                
            if (token.type == TokenType.Integer)
                return new bsexpressions.ConstantExpression(token.value);
                
            if (token.type == TokenType.Real)
                return new bsexpressions.ConstantExpression(token.value);
                
            if (token.type == TokenType.String)
                return new bsexpressions.ConstantExpression(token.value);
                
            if (token.type == TokenType.Name)
                return new bsexpressions.NameExpression(token.value);
        }
    }
    
    var result = {
        parser: function (text) { return new Parser(text); }
    }
    
    return result;
}());

if (typeof(window) === 'undefined')
	module.exports = bsparser;


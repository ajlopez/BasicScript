
var bslexer = require('./bslexer');
var bscommands = require('./bscommands');
var bsexpressions = require('./bsexpressions');

var TokenType = bslexer.TokenType;

var bsparser = (function() {    
    var operators = [ [ "=", "<", ">", "<=", ">=", "<>" ], [ "+", "-" ], [ "*", "/" ] ];
    function Parser(text) {
        var position = 0;
        var lexer = bslexer.lexer(text);
        
        this.parseExpression = function() {
            return parseBinaryExpression(0);
        }
        
        function parseBinaryExpression(level) {
            if (level >= operators.length)
                return parseSimpleTerm();
                
            var expr = parseBinaryExpression(level + 1);
            
            if (expr == null)
                return null;
                
            var token = lexer.nextToken();
            
            if (token == null)
                return expr;
                
            while (token != null && token.type == TokenType.Operator && operators[level].indexOf(token.value) >= 0)
            {
                expr = new bsexpressions.BinaryExpression(expr, parseBinaryExpression(level + 1), token.value);
                token = lexer.nextToken();
            }
            
            if (token != null)
                lexer.pushToken(token);
                
            return expr;
        }
        
        function parseName() {
            var token = lexer.nextToken();
            
            if (token == null || token.type != TokenType.Name)
                throw 'Expected name';

            return token.value;
        }
        
        this.parseCommand = function() {
            var token = lexer.nextToken();
            
            if (token == null)
                return null;
                
            if (token.type == TokenType.Name) {
                var name = token.value;
                
                if (name == 'return') {
                    var expression = this.parseExpression();
                    isEndOfCommand(lexer.nextToken());
                    return new bscommands.ReturnCommand(expression);
                }
                
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
                
                if (name == 'dim') {
                    var name = parseName();
                    var expression = null;
                    
                    if (tryParseToken('=', TokenType.Operator))
                        expression = this.parseExpression();
                    
                    return new bscommands.DimCommand(name, expression);
                }
                
                if (name == 'for') {
                    var name = parseName();
                    parseToken('=', TokenType.Operator);
                    var fromexpression = this.parseExpression();
                    parseToken('to', TokenType.Name);
                    var toexpression = this.parseExpression();
                    var stepexpression;
                    
                    if (tryParseToken('step', TokenType.Name))
                        stepexpression = this.parseExpression();
                    
                    var commands = [];
                    
                    isEndOfCommand(lexer.nextToken());

                    for (var token = lexer.nextToken(); !isEnd(token); token = lexer.nextToken()) {
                        if (token == null)
                            throw new "end expected";
                        lexer.pushToken(token);
                        commands.push(this.parseCommand());                        
                    }
                    
                    return new bscommands.ForCommand(name, fromexpression, toexpression, stepexpression, commands);
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
        
        function parseSimpleTerm() {
            var token = lexer.nextToken();
            
            if (token == null)
                return null;
                
            if (token.type == TokenType.Operator)
                if (token.value == '-')
                    return new bsexpressions.NegateExpression(parseSimpleTerm());
                else if (token.value == '+')
                    return parseSimpleTerm();                
                
            lexer.pushToken(token);
            
            return parseTerm();
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


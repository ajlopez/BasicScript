
var bslexer = require('./bslexer');

var TokenType = bslexer.TokenType;

var basicscript = (function() {
    function Context() {
        var values = {};
        
        this.getValue = function(name) {
            if (!name)
                return null;
            
            var value = values[name];
            
            return value ? value : null;
        }
        
        this.setValue = function(name, value) {
            values[name] = value;
        }
    }
    
    function IfCommand(expression, thencommands, elsecommands)
    {
        this.execute = function(context) {
            var commands = expression.evaluate(context) ? thencommands : elsecommands;
            
            if (!commands)
                return;
            
            for (var n in commands)
                commands[n].execute(context);
        };
    }
    
    function AssignCommand(name, expression)
    {
        this.execute = function(context) {
            context.setValue(name, evaluate(expression, context));
        };
        
        function evaluate(expression, context) {
            if (expression == null)
                return null;
                
            return expression.evaluate(context);
        }
    }
    
    function ExpressionCommand(expression)
    {
        this.execute = function(context) {
            expression.evaluate(context);
        };
        
        this.evaluate = function(context) {
            return expression.evaluate(context);
        };
    }
    
    function NameExpression(name) {
        this.evaluate = function(context) {
            if (!context)
                return null;
            return context.getValue(name);
        };
    }
    
    function BinaryExpression(left, right, oper) {
        if (oper == '+')
            this.evaluate = function(context) { return left.evaluate(context) + right.evaluate(context); };
        else if (oper == '-')
            this.evaluate = function(context) { return left.evaluate(context) - right.evaluate(context); };
        else if (oper == '*')
            this.evaluate = function(context) { return left.evaluate(context) * right.evaluate(context); };
        else if (oper == '/')
            this.evaluate = function(context) { return left.evaluate(context) / right.evaluate(context); };
        else if (oper == '=')
            this.evaluate = function(context) { return left.evaluate(context) == right.evaluate(context); };
    }
    
    function ConstantExpression(value) {
        this.evaluate = function() { return value; };
    }
    
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
                expression = new BinaryExpression(expression, term, token.value);
                token = lexer.nextToken();
            }
            
            if (token != null)
                lexer.pushToken(token);
                
            return expression;
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
                    
                    return new IfCommand(expression, thencommands, elsecommands);
                }
                
                if (tryParseToken('=', TokenType.Operator)) {
                    var expression = this.parseExpression();
                    isEndOfCommand(lexer.nextToken());
                    return new AssignCommand(name, expression);
                }
            }
            
            lexer.pushToken(token);
            
            var expression = this.parseExpression();
            
            isEndOfCommand(lexer.nextToken());
            
            return new ExpressionCommand(expression);
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
                return new ConstantExpression(token.value);
                
            if (token.type == TokenType.String)
                return new ConstantExpression(token.value);
                
            if (token.type == TokenType.Name)
                return new NameExpression(token.value);
        }
    }
    
    function evaluate(text, context) {
        var parser = new Parser(text);
        var expression = parser.parseExpression();
        
        if (!expression)
            return null;
            
        return expression.evaluate(context);
    }
    
    function execute(text, context) {
        var parser = new Parser(text);
        
        for (var command = parser.parseCommand(); command != null; command = parser.parseCommand())
            command.execute(context);
    }
    
    var result = {
        context: function () { return new Context(); },
        evaluate: evaluate,
        execute: execute
    }
    
    if (typeof(global) !== 'undefined' && global.testing) {
        result.Parser = Parser;
        result.TokenType = TokenType;
        result.AssignCommand = AssignCommand;
        result.ExpressionCommand = ExpressionCommand;
        result.BinaryExpression = BinaryExpression;
        result.IfCommand = IfCommand;
    }
    
    return result;
}());

if (typeof(window) === 'undefined') {
	module.exports = basicscript;
}



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
    }
    
    function ConstantExpression(value) {
        this.evaluate = function() { return value; };
    }
    
    var TokenType = { Integer: 1, String: 2, Name: 3, Operator: 4 };
    
    function Token(value, type)
    {
        this.value = value;
        this.type = type;
    }
    
    var operators = "+-*/";
    
    function Lexer(text) {
        var position = 0;
        
        this.nextToken = function() {
            var ch = nextFirstChar();
            
            if (ch == null)
                return null;
                
            if (isDigit(ch))
                return nextNumber(ch);
                
            if (isOperator(ch))
                return nextOperator(ch);
                
            if (ch == '"' || ch == "'")
                return nextString(ch);
            
            if (isLetter(ch) || ch == '_')
                return nextName(ch);
        }
        
        function nextOperator(ch)
        {
            return new Token(ch, TokenType.Operator);
        }

        function nextString(quote)
        {
            var string = '';
            
            for (var ch = nextChar(); ch && ch != quote; ch = nextChar())
                string += ch;
                
            return new Token(string, TokenType.String);
        }
        
        function nextNumber(digit)
        {
            var number = digit;
            
            for (var ch = nextChar(); ch && isDigit(ch); ch = nextChar())
                number += ch;
                
            pushChar(ch);
                
            return new Token(parseInt(number), TokenType.Integer);
        }
        
        function nextName(letter)
        {
            var name = letter;
            
            for (var ch = nextChar(); ch && (isLetter(ch) || isDigit(ch) || ch == '_'); ch = nextChar())
                name += ch;

            pushChar(ch);
            
            return new Token(name, TokenType.Name);
        }
        
        function nextFirstChar() {
            if (!text)
                return null;
                
            skipSpaces();
            
            if (position >= text.length)
                return null;
                
            return nextChar();
        }
        
        function nextChar() {
            return text[position++];
        }
        
        function pushChar(ch) {
            if (ch)
                position--;
        }
        
        function skipSpaces() {
            while (position < text.length && isSpace(text[position]))
                position++;
        }
        
        function isSpace(ch) {
            if (ch <= ' ')
                return true;
                
            return false;
        }
        
        function isOperator(ch) {
            return operators.indexOf(ch) >= 0;
        }
        
        function isLetter(ch) {
            return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
        }
        
        function isDigit(ch) {
            return ch && ch >= '0' && ch <= '9';
        }
    }
    
    function Parser(text) {
        var position = 0;
        var lexer = new Lexer(text);
        
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
                
            return expression;
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
    
    var result = {
        Context: Context,
        evaluate: evaluate
    }
    
    if (typeof(global) !== 'undefined' && global.testing) {
        result.Parser = Parser;
        result.Lexer = Lexer;
        result.TokenType = TokenType;
    }
    
    return result;
}());

if (typeof(window) === 'undefined') {
	module.exports = basicscript;
}


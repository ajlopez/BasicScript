
var bslexer = (function() {    
    var TokenType = { Integer: 1, Real: 2, String: 3, Name: 4, Operator: 5, EndOfLine: 6 };
    
    function Token(value, type)
    {
        this.value = value;
        this.type = type;
    }
    
    var operators = "+-*/=<>";
    
    function Lexer(text) {
        var position = 0;
        var nexts = []
        
        this.nextToken = function() {
            if (nexts.length > 0)
                return nexts.pop();
            
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
            
            if (ch == '\n')
                return nextEndOfLine(ch);
        }
        
        this.pushToken = function(token) {
            if (token)
                nexts.push(token);
        }
        
        function nextOperator(ch)
        {
            return new Token(ch, TokenType.Operator);
        }
        
        function nextEndOfLine(ch)
        {
            return new Token('\n', TokenType.EndOfLine);
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
                
            if (ch == '.')
                return nextReal(number);
                
            pushChar(ch);
                
            return new Token(parseInt(number), TokenType.Integer);
        }
        
        function nextReal(integer)
        {
            var number = integer + '.';
            
            for (var ch = nextChar(); ch && isDigit(ch); ch = nextChar())
                number += ch;
                
            pushChar(ch);
                
            return new Token(parseFloat(number), TokenType.Real);
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
            if (ch <= ' ' && ch != '\n')
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
    
    return {
        TokenType: TokenType,
        lexer: function (text) { return new Lexer(text); },
        token: function (value, type) { return new Token(value, type); }
    }
    
    return result;
}());

if (typeof(window) === 'undefined')
	module.exports = bslexer;



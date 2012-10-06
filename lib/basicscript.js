
var basicscript = (function() {
    function ConstantExpression(value) {
        this.value = value;
        this.evaluate = function() { return this.value; };
    }
    
    function Parser(text) {
        var position = 0;
        
        this.parseExpression = function() {
            var ch = nextFirstChar();
            
            if (ch == null)
                return null;
                
            if (isDigit(ch))
                return nextNumber(ch);
        }
        
        function nextNumber(digit)
        {
            var number = digit;
            
            for (var ch = nextChar(); ch && isDigit(ch); ch = nextChar())
                number += ch;
                
            return new ConstantExpression(parseInt(number));
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
        
        function skipSpaces() {
            while (position < text.length && isSpace(text[position]))
                position++;
        }
        
        function isSpace(ch) {
            if (ch <= ' ')
                return true;
                
            return false;
        }
        
        function isDigit(ch) {
            return ch && ch >= '0' && ch <= '9';
        }
    }
    
    return {
        Parser: Parser
    }    
}());

if (typeof(window) === 'undefined') {
	module.exports = basicscript;
}



var bsparser = require('./bsparser');

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
    
    function evaluate(text, context) {
        var parser = bsparser.parser(text);
        var expression = parser.parseExpression();
        
        if (!expression)
            return null;
            
        return expression.evaluate(context);
    }
    
    function execute(text, context) {
        var parser = bsparser.parser(text);
        
        for (var command = parser.parseCommand(); command != null; command = parser.parseCommand())
            command.execute(context);
    }
    
    var result = {
        context: function () { return new Context(); },
        evaluate: evaluate,
        execute: execute
    }
    
    return result;
}());

if (typeof(window) === 'undefined') {
	module.exports = basicscript;
}


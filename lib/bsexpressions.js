
var bsexpressions = (function() {    
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
        else if (oper == '<')
            this.evaluate = function(context) { return left.evaluate(context) < right.evaluate(context); };
        else if (oper == '>')
            this.evaluate = function(context) { return left.evaluate(context) > right.evaluate(context); };
        else if (oper == '<=')
            this.evaluate = function(context) { return left.evaluate(context) <= right.evaluate(context); };
        else if (oper == '>=')
            this.evaluate = function(context) { return left.evaluate(context) >= right.evaluate(context); };
        else if (oper == '<>')
            this.evaluate = function(context) { return left.evaluate(context) != right.evaluate(context); };
    }
    
    function ConstantExpression(value) {
        this.evaluate = function() { return value; };
    }
    
    return {
        NameExpression: NameExpression,
        BinaryExpression: BinaryExpression,
        ConstantExpression: ConstantExpression
    }
}());

if (typeof(window) === 'undefined')
	module.exports = bsexpressions;


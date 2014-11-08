
var bscommands = (function() {
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

    function WhileCommand(expression, commands)
    {
        this.execute = function(context) {
            while (expression.evaluate(context))
                for (var n in commands)
                    commands[n].execute(context);
        };
    }

    function DimCommand(name, expression)
    {
        this.execute = function(context) {
            var value = null;
            
            if (expression)
                value = expression.evaluate(context);
                
            context.setValue(name, value);
        };
    }

    function ForCommand(name, fromexpression, toexpression, stepexpression, commands)
    {
        this.execute = function(context) {
            var fromvalue = fromexpression.evaluate(context);
            var stepvalue;
            
            if (stepexpression)
                stepvalue = stepexpression.evaluate(context);
            else
                stepvalue = 1;
            
            context.setValue(name, fromvalue);
            
            while ((stepvalue >= 0 && fromvalue <= toexpression.evaluate(context)) || (stepvalue < 0 && fromvalue >= toexpression.evaluate(context))) {
                for (var n in commands)
                    commands[n].execute(context);
                if (stepexpression)
                    stepvalue = stepexpression.evaluate(context);
                fromvalue += stepvalue;
                context.setValue(name, fromvalue);
            }
        };
    }
    
    function ReturnCommand(expr)
    {
        this.execute = function(context) {
            context.hasReturnValue = true;
            if (expr)
                context.returnValue = expr.evaluate(context);
            else
                context.returnValue = null;
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
    
    return {
        IfCommand: IfCommand,
        WhileCommand: WhileCommand,
        ForCommand: ForCommand,
        DimCommand: DimCommand,
        AssignCommand: AssignCommand,
        ReturnCommand: ReturnCommand,
        ExpressionCommand: ExpressionCommand
    }
}());

if (typeof(window) === 'undefined')
	module.exports = bscommands;


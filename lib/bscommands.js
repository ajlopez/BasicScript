
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
        AssignCommand: AssignCommand,
        ExpressionCommand: ExpressionCommand
    }
}());

if (typeof(window) === 'undefined')
	module.exports = bscommands;



var basicscript = (function() {
    function Parser() {
    }
    
    return {
        Parser: Parser
    }    
}());

if (typeof(window) === 'undefined') {
	module.exports = basicscript;
}


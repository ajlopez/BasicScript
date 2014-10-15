
global.testing = true;

var basicscript = require('../');

exports['execute simple assign'] = function (test) {
    var context = basicscript.context();
    basicscript.execute('a=1', context);
    test.equal(1, context.getValue('a'));
}

exports['execute simple add assign'] = function (test) {
    var context = basicscript.context();
    basicscript.execute('b=1+2', context);
    test.equal(3, context.getValue('b'));
}


var basicscript = require('../'),
    assert = require('assert');

// Execute simple assign

var context = new basicscript.Context();
basicscript.execute('a=1', context);
assert.equal(1, context.getValue('a'));

// Execute simple add assign

basicscript.execute('b=1+2', context);
assert.equal(3, context.getValue('b'));

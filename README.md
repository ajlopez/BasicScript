# BasicScript

BASIC language interpreter in Javascript. Work in Progress

## Installation

Via npm on Node:

```
npm install basicscript
```


## Usage

Reference in your program:

```js
var basicscript = require('basicscript');
```

Evaluate expression with constants
```js
basicscript.evaluate('1+2'); // 3
```

Evaluate expression with variables
```js
var context = new basicscript.Context();
context.setValue('one', 1);
context.setValue('two', 2);
basicscript.evaluate('one+two'); // 3
```

Execute command
```js
basicscript.execute('one = 1');
```

## Development

```
git clone git://github.com/ajlopez/BasicScript.git
cd BasicScript
npm install
npm test
```

## Samples

TBD

## To do

- Samples

## Contribution

Feel free to [file issues](https://github.com/ajlopez/BasicScript) and submit
[pull requests](https://github.com/ajlopez/BasicScript/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.


# promise-try

[![Build Status](https://travis-ci.org/wbinnssmith/promise-try.svg?branch=master)](https://travis-ci.org/wbinnssmith/promise-try)

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

Wraps a synchronously executing function and returns a promise that resolves to its return value and rejects its exceptions. API-compatible with [Bluebird](https://github.com/petkaantonov/bluebird)'s `Promise.try` ([API Reference](http://bluebirdjs.com/docs/api/promise.try.html)).

Accepts an alternate Promise implementation as input if the environment doesn't natively support them.

This module is meant to be a convenient standalone implementation of a Promise utility, but it doesn't provide an alternate Promise constructor and is less than 500 bytes minified and gzipped.

## Example
```js
var promiseTry = require('promise-try');

promiseTry(function () {
	return 5;
}).then(result => assert(result === 5));
```

## API

```js
function promiseTry(fn, Promise)
```

`fn` - a synchronously executed function that may return or throw synchronously. This will be wrapped and returned as a promise.  If arguments or a context need to be
applied to the function, use `fn.bind(ctx, arg1, arg2...)`:

```js
promiseTry(function (paramValue) { return paramValue * valueInThis }.bind(this, 5));
```

`Promise` - an alternate Promise implementation to use (perhaps if a global one doesn't exist)

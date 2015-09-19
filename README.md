# promise-try

Wraps a synchronously executing function and returns a promise that resolves to its return value and rejects its exceptions. API-compatible with [Bluebird](https://github.com/petkaantonov/bluebird)'s `Promise.try`.

Accepts an alternate Promise implementation as input if the environment doesn't natively support them.

This module is meant to be a convenient standalone implementation of a Promise utility, but it doesn't provide an alternate Promise constructor and is less than 500 bytes minified and gzipped.

## API

```js
function promiseTry(fn, args, ctx, Promise)
```

`fn` - a synchronously executed function that may return or throw synchronously. This will be wrapped and returned as a promise.

`args` - arguments to applied to the passed function. If not an array, it will be passed as a single argument to the function. If an array, it will be spread across the function's parameters.

<small>I personally don't like this API since one could never achieve passing the function a single argument that is an array, but this is here for compatibility with bluebird. Instead, one could just use something like `.bind(null, [1, 2, 3])` when passing the function.</small>

`ctx` - the context (`this`) to be used when the function is executed.

<small>Again, one could just use `.bind(ctx)` on the original function</small>

`Promise` an alternate Promise implementation to use (perhaps if a global one doesn't exist)

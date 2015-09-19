module.exports = function promiseTry (fn, args, ctx, Promise) {
  Promise = Promise || global.Promise;

  return new Promise(function (resolve, reject) {
    try {
      var method = Array.isArray(args) ? 'apply' : 'call';
      resolve(fn[method](ctx, args));
    } catch (e) {
      reject(e);
    }
  });
};

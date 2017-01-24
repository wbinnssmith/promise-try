module.exports = function promiseTry (boundFn, Promise) {
  Promise = Promise || global.Promise;

  return new Promise(function (resolve, reject) {
    try {
      resolve(boundFn());
    } catch (e) {
      reject(e);
    }
  });
};

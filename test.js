var Pinkie = require('pinkie');
var test = require('blue-tape');
var ptry = require('./');

test('returns a rejected promise when the function throws', function (t) {
  t.plan(1);

  var error = new Error('oh noes!');
  ptry(function () {
    throw error;
  }).then(function () {
    t.fail('promise resolved when should have rejected');
  }).catch(function (e) {
    if (e === error) {
      t.pass();
    } else {
      t.fail('promise rejected with wrong error');
    }
  });
});

test('returns promise resolving with a successful return value', function (t) {
  return ptry(function () {
    return 'success!';
  }).then(function (results) {
    t.equal(results, 'success!');
  });
});

test('calls with a given argument if not an array', function (t) {
  return ptry(function (x) {
    return x * x;
  }, 5).then(function (res) {
    t.equal(res, 25);
  });
});

test('applies with a given argument if an array', function (t) {
  return ptry(function (x, y) {
    return x * y;
  }, [5, 10]).then(function (res) {
    t.equal(res, 50);
  });
});

test('uses the provided context when executing the function', function (t) {
  var ctx = {
    x: 'hello ',
    y: 'world'
  };

  return ptry(function () {
    return this.x + this.y;
  }, null, ctx).then(function (res) {
    t.equal(res, 'hello world');
  });
});

test('doesnt re-wrap promise-returning functions', function (t) {
  return ptry(function () {
    return Promise.resolve(5);
  }).then(function (res) {
    t.equal(res, 5);
  });
});

test('doesnt re-wrap thenable-returning functions', function (t) {
  return ptry(function () {
    return {
      then: function (onResolve, onReject) {
        onResolve(5);
      }
    };
  }).then(function (res) {
    t.equal(res, 5);
  });
});

test('uses user-provided Promise constructor if passed', function (t) {
  return ptry(function () {
    return 5;
  }, null, null, Pinkie).then(function (res) {
    t.equal(res, 5);
  });
});

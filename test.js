var tape    = require('tape'),
    Runner5 = require('./index');

(function() {
  var error       = "ERROR!",
      failureFunc = function(cb) { cb(error, null) };

  tape('runner fails with error', function(t) {
    var runner = new Runner5({}, failureFunc);

    t.plan(1);
    runner.error(function(err) { t.equal(error, err); });
    runner.run();
  });

  tape('runner triggers failure event with error', function(t) {
    var runner = new Runner5({}, failureFunc);

    t.plan(1);
    runner.on('failure', function(err) { t.equals(error, err); });
    runner.run();
  });
})();

(function() {
  var results     = {test: true},
      successFunc = function(cb) { cb(null, results) };

  tape('runner passes results to success function', function(t) {
    t.plan(1);
    var runner = new Runner5({}, successFunc);

    runner.success(function(r) {
      t.equal(results, r);
    });

    runner.run();
  });

  tape('runner passes results to success function with a empty object as error', function(t) {
    t.plan(1);
    var runner = new Runner5({}, function(cb) { cb({}, results) });

    runner.success(function(r) {
      t.equal(results, r);
    });

    runner.run();
  });

  tape('runner triggers success event with results', function(t) {
    t.plan(1);
    var runner = new Runner5({}, successFunc);

    runner.on('success', function(r) {
      t.equal(results, r);
    });

    runner.run();
  });
})();

(function() {
  tape('runner passes arguments to function', function(t) {
    t.plan(2);
    var func = function(a, b) {
      t.equals(a, 1);
      t.equals(b, 2);
    }

    var runner = new Runner5({}, func);
    runner.run(1, 2);
  });

  tape('runner passes context to function', function(t) {
    t.plan(1);
    var self = { test: 'context' };
    var func = function() {
      t.equals(this, self);
    }

    var runner = new Runner5(self, func);
    runner.run();
  });

  tape('runner passes no context to function', function(t) {
    t.plan(1);
    var func = function() {
      t.deepEquals(this, {});
    }

    var runner = new Runner5(func);
    runner.run();
  });
})();


var EventEmitter = require('events').EventEmitter,
    util         = require('util');

function Runner(ctx, func) {
  this.func = func;
  this.ctx = ctx;
}

util.inherits(Runner, EventEmitter);

Runner.prototype.run = function() {
  var args = Array.prototype.slice.call(arguments),
      self = this;

  args.push(function(err, result) {
    if (err) {
      self._error && self._error(err);
      self.emit('failure', err);
    } else {
      self._success && self._success(result);
      self.emit('success', result);
    }
  });

  this.func.apply(this.ctx, args);
}

Runner.prototype.success = function(f) {
  this._success = f;
}

Runner.prototype.error = function(f) {
  this._error = f;
}

module.exports = Runner;

var EventEmitter = require('events').EventEmitter,
    util         = require('util');

function Runner(ctx, func) {
  if (!func) {
    func = ctx;
    ctx = {};
  }
  this.func = func;
  this.ctx = ctx;
}

util.inherits(Runner, EventEmitter);

Runner.prototype.run = function() {
  var args = Array.prototype.slice.call(arguments),
      self = this;

  args.push(function(err, result) {
    if (err) {
      this._errored(err)
    } else {
      this._finished(result);
    }
  }.bind(this));

  this.func.apply(this.ctx, args);
}

Runner.prototype._errored = function(err) {
  process.nextTick(function() {
    this._error && this._error(err);
    this.emit('failure', err);
  }.bind(this));
}

Runner.prototype._finished = function(result) {
  process.nextTick(function() {
    this._success && this._success(result);
    this.emit('success', result);
  }.bind(this));
}

Runner.prototype.success = function(f) {
  this._success = f;
}

Runner.prototype.error = function(f) {
  this._error = f;
}

module.exports = Runner;

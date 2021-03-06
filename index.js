var EventEmitter = require('events').EventEmitter,
    util         = require('util');

function Runner(ctx, func) {
  if (!func) {
    func = ctx;
    ctx = {};
  }
  this.func = func;
  this.ctx = ctx;
  this._successCheck = function(err) {
    return !err || (typeof(err) == "object" && !Object.keys(err).length);
  };
}

util.inherits(Runner, EventEmitter);

Runner.prototype.run = function() {
  var args = Array.prototype.slice.call(arguments);

  args.push(function(err, result) {
    this._isSuccess(err) ? this._finished(result) : this._errored(err);
  }.bind(this));

  this.func.apply(this.ctx, args);
}

Runner.prototype.setSuccessCheck = function(func) {
  this._successCheck = func;
}

Runner.prototype._isSuccess = function(err) {
  return this._successCheck(err);
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

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
      self.error && self.error(err); 
      self.emit('failure', err); 
    } else {
      self.success && self.success(result); 
      self.emit('success', result);
    }
  });

  this.func.apply(this.ctx, args);
}

Runner.prototype.success = function(f) {
  this.success = f;
}

Runner.prototype.error = function(f) {
  this.error = f;
}

module.exports = Runner;

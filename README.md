Runner5
=======

[![Build Status](https://travis-ci.org/bthesorceror/runner5.png?branch=master)](https://travis-ci.org/bthesorceror/runner5)

Running all of your functions.

Notes
----

Context is an optional argument

Error Example:
--------------

```javascript
var Runner5 = require('runner5');

function test(arg1, cb) {
  // do something
  cb('BLAH!', null);
}

var context = {};

var runner = new Runner5(context, test)

runner.error(function(err) {
  console.log(err);
});

runner.run(4);
```

or

```javascript
var Runner5 = require('runner5');

function test(arg1, cb) {
  // do something
  cb('BLAH!', null);
}

var context = {};

var runner = new Runner5(context, test)

runner.on('failure', function(err) {
  console.log(err);
});

runner.run(4);
```

Success Example:
--------------

```javascript
var Runner5 = require('runner5');

function test(arg1, cb) {
  // do something
  cb(null, ['a', 'b']);
}

var context = {};

var runner = new Runner5(context, test)

runner.success(function(results) {
  console.log(results);
});

runner.run(4);
```

or

```javascript
var Runner5 = require('runner5');

function test(arg1, cb) {
  // do something
  cb(null, ['a', 'b']);
}

var context = {};

var runner = new Runner5(context, test)

runner.on('success', function(results) {
  console.log(results);
});

runner.run(4);
```

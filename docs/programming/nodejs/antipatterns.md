# Antipatterns

## Don’t starve the event loop 
Running too much code in a single stack will stall the event loop and prevent other callbacks from firing. One way to fix this is to
break CPU-heavy operations up across multiple stacks (using `setImmediate()`). It should never be done using `process.nextTick()`:

```javascript

const nextTickRecursive = () => process.nextTick(nextTickRecursive);
nextTickRecursive(); // will never run

const setImmediateRecursive = () => setImmediate(setImmediateRecursive);
setImmediateRecursive(); // will run

setInterval(() => console.log('Test'), 10);

```

## Don’t introduce Zalgo
When exposing a method that takes a callback, that  callback should always be run asynchronously. It should not be done like this:

```javascript

function test1(count, callback) {
    if (count <= 0) {
        return callback(new TypeError('count > 0'));
    }
    
    testAsyncOperation(count, callback);
}

```

It should be done like this:

```javascript

function test1(count, callback) {
    if (count <= 0) {
        return process.nextTick(() => callback(new TypeError('count > 0')));
    }

    testAsyncOperation(count, callback);
}

```

or this:

```javascript

function test1(count, callback) {
    if (count <= 0) {
        return setImmediate(() => callback(new TypeError('count > 0')));
    }

    testAsyncOperation(count, callback);
}

```

```
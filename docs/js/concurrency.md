# JavaScript concurrency

## Principles

- Parallelize
- Synchronize
- Conserve

### Parallelize

The parallelize principle means taking advantage of modern CPU capabilities to
compute results in less time. This is now possible in any modern browser or NodeJS
environment. In the browser, we can achieve true parallelism using web workers.
In Node, we can achieve true parallelism by spawning new processes. 

### Synchronize

The synchronize principle is about the mechanisms used to coordinate concurrent
actions and the abstractions of those mechanisms. Callback functions are a JavaScript
notion with deep roots. 

### Conserve

The conserve principle is about saving on compute and memory resources. This is
done by using lazy evaluation techniques. The name lazy stems from the idea that we
don't actually compute a new value until we're sure we actually need it.

## None blocking UI

- make message processing short and/or cut down one message into several messages;
- web workers;
- lazy loading;

## Useful links

https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop - Concurrency model and Event Loop;

# NodeJS loop

## General

- Node.js runs code in the Event Loop (initialization and callbacks) and offers a Worker Pool to handle expensive tasks like file I/O;
- scales well, sometimes better than Apache;
- uses a small number of threads to handle many clients (not allocating additional space and time for new threads);
- Node.js have two types of threads: one Event Loop (aka the main loop, main thread, event thread, etc.), and a pool of `k` Workers in a Worker Pool (aka the threadpool);

## Performance

- heavyweight activity on either type of thread will affect the throughput (requests/second);

## Security

- for certain input one of the threads might get blocked (Denial of Service attack);

## Event loop

- initialization phase: require'ing modules and registering callbacks for events;
- event Loop: respond to incoming client requests by executing the appropriate callbacks;
- callbacks executes synchronously, and may register asynchronous requests to continue processing after it completes;
- callbacks for asynchronous requests will also be executed on the Event Loop;
- event loop will fulfill the non-blocking asynchronous requests made by its callbacks (I/O);

### Event Loop Phases

#### Poll
The poll phase executes I/O-related callbacks. This is the phase that  application code is most likely to execute in. When your main application
code starts running, it runs in this phase.

#### Check
In this phase, callbacks that are triggered via setImmediate() are executed.

#### Close
This phase executes callbacks that are triggered via EventEmitter close  events. For example, when a net.Server TCP server closes, it emits a close event that 
runs a callback in this phase.

#### Timers
Callbacks scheduled using setTimeout() and setInterval() are executed in this phase.

#### Pending
Special system events are run in this phase, like when a net. Socket TCP socket throws an ECONNREFUSED error.

Poll -> Check -> Close -> Timers -> Pending

### Event loop microtask queues

There are two special microtask queues that can have callbacks added to them while a phase is running:

- The first microtask queue handles callbacks that have been registered using process.nextTick();
- The second microtask queue handles promises that reject or resolve;

Callbacks in the microtask queues take priority over callbacks in the phase’s normal queue, and callbacks in the next tick microtask queue run before callbacks in 
the promise microtask queue.

## Worker pool

- implemented in `libuv` (exposes a general task submission API);
- handle 'expensive' tasks (I/O for which an operating system does not provide a non-blocking version and some CPU-intensive tasks);

### Worker pool modules

- I/O-intensive;
- DNS (dns.lookup(), dns.lookupService());
- File System (all file system APIs except fs.FSWatcher() and those that are explicitly synchronous);
- PU-intensive;
- Crypto (crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair());
- Zlib (all zlib APIs except those that are explicitly synchronous use libuv's threadpool);

### Queue

- the Event Loop does not actually maintain a queue;
- event Loop has a collection of file descriptors that it asks the operating system to monitor, using a mechanism like epoll (Linux), kqueue (OSX), event ports (Solaris), or IOCP (Windows);
- Worker Pool uses a real queue whose entries are tasks to be processed;

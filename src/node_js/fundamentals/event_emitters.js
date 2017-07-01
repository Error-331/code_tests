'use strict';

const EventEmitter = require('events');

class TestEmitterClass1 extends EventEmitter {
}

module.exports = async () => {
    const testEmitterObj1 = new TestEmitterClass1();

    testEmitterObj1.on('newListener', (event, listener) => {
        console.log('new listener registered for event -', event);
    });

    testEmitterObj1.on('test_event_1', (param1, param2) => {
        console.log(param1, param2);
    });

    testEmitterObj1.once('test_event_2', (param1, param2) => {
        console.log(param1, param2);
    });

    testEmitterObj1.on('error', (error) => {
        console.error('error emitted -', error);
    });

    testEmitterObj1.emit('test_event_1', 'test_event_val1', 'test_event_val2');
    testEmitterObj1.emit('test_event_1', 'test_event_val3', 'test_event_val4');

    testEmitterObj1.emit('test_event_2', 'test_event_val1', 'test_event_val2');
    testEmitterObj1.emit('test_event_2', 'test_event_val3', 'test_event_val4');

    testEmitterObj1.emit('error', new Error('test_error_1'));

    console.log(testEmitterObj1.listenerCount('test_event_1'));
};
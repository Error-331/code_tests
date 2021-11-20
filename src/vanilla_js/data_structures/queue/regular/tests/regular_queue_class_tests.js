// external imports
const assert = require('assert').strict;

// internal imports
const RegularQueueClass = require('./../code/regular_queue_class');
const {
    checkRegularQueueEmpty,
    checkRegularQueueNotEmpty,
    checkRegularQueueItems,
} = require('./../../../../../../utils/testing/data_structures/regular_queue_test_utils');

// implementation
function testQueueEmptyCase() {
    const queueObj = new RegularQueueClass();
    checkRegularQueueEmpty(queueObj);
}

function testQueueNotEmptyCase() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(5);
    queueObj.enqueue(7);
    queueObj.enqueue(-1);
    queueObj.enqueue(10);

    checkRegularQueueNotEmpty(queueObj, 4, 0,5);
    checkRegularQueueItems(queueObj, [5, 7, -1, 10]);
}

function testQueuePeekCase1() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(5);

    checkRegularQueueNotEmpty(queueObj, 1, 0,5);
    checkRegularQueueItems(queueObj, [5]);

    const queueItem = queueObj.peek();
    assert.strictEqual(queueItem, 5);
}

function testQueuePeekCase2() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(74);
    queueObj.enqueue(1);

    checkRegularQueueNotEmpty(queueObj, 2, 0,74);
    checkRegularQueueItems(queueObj, [74, 1]);

    let queueItem = queueObj.peek();
    assert.strictEqual(queueItem, 74);

    queueItem = queueObj.peek();
    assert.strictEqual(queueItem, 74);
}

function testQueueEnqueueCase1() {
    const queueObj = new RegularQueueClass();
    queueObj.enqueue(5);

    checkRegularQueueNotEmpty(queueObj, 1, 0, 5);
    checkRegularQueueItems(queueObj, [5]);
}

function testQueueEnqueueCase2() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(5);
    queueObj.enqueue(7);
    queueObj.enqueue(-1);
    queueObj.enqueue(10);

    checkRegularQueueNotEmpty(queueObj, 4, 0, 5);
    checkRegularQueueItems(queueObj, [5, 7, -1, 10]);
}

function testQueueDequeueCase1() {
    const queueObj = new RegularQueueClass();
    queueObj.enqueue(5);

    checkRegularQueueNotEmpty(queueObj, 1, 0, 5);
    checkRegularQueueItems(queueObj, [5]);

    const queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, 5);

    checkRegularQueueItems(queueObj);
    checkRegularQueueEmpty(queueObj);
}

function testQueueDequeueCase2() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(5);
    queueObj.enqueue(7);
    queueObj.enqueue(-1);
    queueObj.enqueue(10);

    checkRegularQueueNotEmpty(queueObj, 4, 0, 5);
    checkRegularQueueItems(queueObj, [5, 7, -1, 10]);

    let queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, 5);

    queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, 7);

    checkRegularQueueNotEmpty(queueObj, 2, 2, -1);
    checkRegularQueueItems(queueObj, [-1, 10], -2);

    queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, -1);

    queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, 10);

    checkRegularQueueEmpty(queueObj);
}

function testQueueDequeueCase3() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(74);
    queueObj.enqueue(1);
    queueObj.enqueue(-65);
    queueObj.enqueue(-2);
    queueObj.enqueue(88);

    checkRegularQueueNotEmpty(queueObj, 5, 0, 74);
    checkRegularQueueItems(queueObj, [74, 1, -65, -2, 88]);

    let queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, 74);

    queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, 1);

    checkRegularQueueNotEmpty(queueObj, 3, 2, -65);
    checkRegularQueueItems(queueObj, [-65, -2, 88], -2);

    queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, -65);

    queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, -2);

    checkRegularQueueNotEmpty(queueObj, 1, 4, 88);
    checkRegularQueueItems(queueObj, [88], -4);

    queueItem = queueObj.dequeue();
    assert.strictEqual(queueItem, 88);
    checkRegularQueueEmpty(queueObj);
}

function testQueueClearCase1() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(5);

    checkRegularQueueNotEmpty(queueObj, 1, 0,5);
    checkRegularQueueItems(queueObj, [5]);

    queueObj.clear();
    checkRegularQueueEmpty(queueObj);
}

function testQueueClearCase2() {
    const queueObj = new RegularQueueClass();

    queueObj.enqueue(5);
    queueObj.enqueue(7);
    queueObj.enqueue(-1);
    queueObj.enqueue(10);

    checkRegularQueueNotEmpty(queueObj, 4, 0,5);
    checkRegularQueueItems(queueObj, [5, 7, -1, 10]);

    queueObj.clear();
    checkRegularQueueEmpty(queueObj);
}

testQueueEmptyCase();
testQueueNotEmptyCase();

testQueuePeekCase1();
testQueuePeekCase2();

testQueueEnqueueCase1();
testQueueEnqueueCase2();

testQueueDequeueCase1();
testQueueDequeueCase2();
testQueueDequeueCase3();

testQueueClearCase1();
testQueueClearCase2();

// exports

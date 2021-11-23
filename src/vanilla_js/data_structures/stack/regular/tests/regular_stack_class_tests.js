// external imports
const assert = require('assert').strict;

// internal imports
const RegularStackClass = require('./../code/regular_stack_class');
const {
    checkRegularStackEmpty,
    checkRegularStackNotEmpty,
    checkRegularStackItems
} = require('./../../../../../../utils/testing/data_structures/regular_stack_class_test_utils');

// implementation
function testStackEmptyCase() {
    const stackObj = new RegularStackClass();
    checkRegularStackEmpty(stackObj);
}

function testStackNotEmptyCase() {
    const stackObj = new RegularStackClass();

    stackObj.push(5);
    stackObj.push(7);
    stackObj.push(-1);
    stackObj.push(10);

    checkRegularStackNotEmpty(stackObj, 4, 10);
}

function testStackPeekCase1() {
    const stackObj = new RegularStackClass();

    stackObj.push(5);

    checkRegularStackNotEmpty(stackObj, 1, 5);
    checkRegularStackItems(stackObj, [5]);

    const stackItem = stackObj.peek();
    assert.strictEqual(stackItem, 5);
}

function testStackPeekCase2() {
    const stackObj = new RegularStackClass();

    stackObj.push(74);
    stackObj.push(1);

    checkRegularStackNotEmpty(stackObj, 2, 1);
    checkRegularStackItems(stackObj, [74, 1]);

    let stackItem = stackObj.peek();
    assert.strictEqual(stackItem, 1);

    stackItem = stackObj.peek();
    assert.strictEqual(stackItem, 1);
}

function testStackPushCase1() {
    const stackObj = new RegularStackClass();
    stackObj.push(5);

    checkRegularStackNotEmpty(stackObj, 1, 5);
    checkRegularStackItems(stackObj, [5]);
}

function testStackPushCase2() {
    const stackObj = new RegularStackClass();

    stackObj.push(5);
    stackObj.push(7);
    stackObj.push(-1);
    stackObj.push(10);

    checkRegularStackNotEmpty(stackObj, 4, 10);
    checkRegularStackItems(stackObj, [5, 7, -1, 10]);
}

function testStackPopCase1() {
    const stackObj = new RegularStackClass();
    stackObj.push(5);

    checkRegularStackNotEmpty(stackObj, 1, 5);
    checkRegularStackItems(stackObj, [5]);

    const stackItem = stackObj.pop();
    assert.strictEqual(stackItem, 5);

    checkRegularStackItems(stackObj);
    checkRegularStackEmpty(stackObj);
}

function testStackPopCase2() {
    const stackObj = new RegularStackClass();

    stackObj.push(5);
    stackObj.push(7);
    stackObj.push(-1);
    stackObj.push(10);

    checkRegularStackNotEmpty(stackObj, 4, 10);
    checkRegularStackItems(stackObj, [5, 7, -1, 10]);

    let stackItem = stackObj.pop();
    assert.strictEqual(stackItem, 10);

    stackItem = stackObj.pop();
    assert.strictEqual(stackItem, -1);

    checkRegularStackNotEmpty(stackObj, 2, 7);
    checkRegularStackItems(stackObj, [5, 7]);

    stackItem = stackObj.pop();
    assert.strictEqual(stackItem, 7);

    stackItem = stackObj.pop();
    assert.strictEqual(stackItem, 5);

    checkRegularStackEmpty(stackObj);
}

function testStackClearCase1() {
    const stackObj = new RegularStackClass();

    stackObj.push(5);

    checkRegularStackNotEmpty(stackObj, 1, 5);
    checkRegularStackItems(stackObj, [5]);

    stackObj.clear();
    checkRegularStackEmpty(stackObj);
}

function testStackClearCase2() {
    const stackObj = new RegularStackClass();

    stackObj.push(5);
    stackObj.push(7);
    stackObj.push(-1);
    stackObj.push(10);

    checkRegularStackNotEmpty(stackObj, 4, 10);
    checkRegularStackItems(stackObj, [5, 7, -1, 10]);

    stackObj.clear();
    checkRegularStackEmpty(stackObj);

}

testStackEmptyCase();
testStackNotEmptyCase();

testStackPeekCase1();
testStackPeekCase2();

testStackPushCase1();
testStackPushCase2();

testStackPopCase1();
testStackPopCase2();

testStackClearCase1();
testStackClearCase2();

// exports
